import { FormControl, ValidationErrors } from "@angular/forms";
import { ValidationError } from "@angular/forms/signals";

export class FormValidators {

  static notOnlyWhiteSpace(control: FormControl) : ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      return { 'notOnlyWhiteSpace': true };
    } else {
      return null;
    }
  }
}
