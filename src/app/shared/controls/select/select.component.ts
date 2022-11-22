import { ListItem, SelectEventArgs } from '@app/models/frontend-models';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  selector: 'ce-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class SelectComponent {
  localListItems: ListItem[] = [];
  selectedItem: ListItem | undefined;
  showDropDown = false;
  disabled = false;
  touched = false;

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showDropDown = false;
    }
  }
  @Input() showImage = false;
  @Input() showValueOnly = false;
  @Input() label: string = '';
  @Input() listItems: ListItem[] = [];
  @Input() exclude = '';

  private innerValue: string;
  private onTouchedCallback: Function = () => {};
  private onChangeCallback: Function = (value: string) => {};

  constructor(private eRef: ElementRef) {}

  get value(): string {
    return this.innerValue;
  }
  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }
  onItemSelect(selectData: SelectEventArgs) {
    this.markAsTouched();
    if (!this.disabled) {
      this.innerValue = selectData.value;
      this.onChangeCallback(selectData.value);
      this.initComponentData();
    }
  }

  public writeValue(value: string): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.initComponentData();
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

  markAsTouched() {
    if (!this.touched) {
      this.onTouchedCallback();
      this.touched = true;
    }
  }

  initComponentData() {
    this.showDropDown = false;
    this.localListItems = [
      ...this.listItems.filter((item) => item.value !== this.exclude),
    ];
    this.selectedItem = this.findItemByValue(this.value);
  }

  itemTrackBy(index: number, item: ListItem) {
    return item.value;
  }

  findItemByValue(value: string) {
    return this.listItems.find((item) => item.value === value);
  }
  toggleDropdown() {
    if (!this.disabled) this.showDropDown = !this.showDropDown;
  }
}
