import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { FormService } from '../../services/form-service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { FormValidators } from '../../validators/form-validators';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

export class Checkout implements OnInit {
  checkoutFormGroup!: FormGroup;
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  countries: Country[] = [];
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService, private formService: FormService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(5)])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(5)])
      }),
      paymentInfo: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
        securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(4), FormValidators.notOnlyWhiteSpace]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required])
      })
    });

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
        this.cdr.detectChanges();
      }
    );

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
        this.cdr.detectChanges();
      }
    );

    this.cartService.computeCartTotals();

    const startMonth: number = new Date().getMonth() + 1;

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );

    this.formService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    );

    this.formService.getCountries().subscribe(
      data => {
        this.countries = data;
        this.cdr.detectChanges();
      }
    );

  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup!.value.country.code;

    this.formService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
        formGroup!.get('state')!.setValue(data[0]);

        this.cdr.detectChanges();
      }
    );

  }

  handleMonthsandYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('paymentInfo');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
  }

  copyShippingAddressToBillingAddress($event: Event) {
    const isChecked = (<HTMLInputElement>$event.target).checked;

    if (isChecked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      // bug fix: need to populate states too
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      //bug fix: need to clear states too
      this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    console.log("CheckoutFormGroup is valid: " + this.checkoutFormGroup.valid);
  }
}
