import { Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { noop } from 'rxjs';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextComponent),
  multi: true,
};

@Component({
  selector: 'ce-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class TextComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'number' = 'text';
  @Input() disabled: boolean = false;

  private onTouchedCallback: Function = () => {};
  private onChangeCallback: Function = () => {};

  private innerValue = '';

  constructor() {}
  get value(): string {
    return this.innerValue;
  }
  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onInput(element: Event) {
    this.value = (<HTMLInputElement>element.target).value;
  }

  handleChange(value: string) {
    this.onTouchedCallback();
    this.onChangeCallback(value);
  }

  public writeValue(value: string): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validateInput(event: KeyboardEvent) {
    if (this.type === 'number') {
      var numbers = new RegExp(/^[0-9]+$/);
      if (!numbers.test(event.key) && !['Backspace'].includes(event.key)) {
        event.preventDefault();
      }
    }
  }
}
