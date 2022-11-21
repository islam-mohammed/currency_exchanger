import { ListItem, SelectEventArgs } from '@app/models/frontend-models';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ce-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnChanges {
  localListItems: ListItem[] = [];
  initilaized = false;
  selectedItem: ListItem | undefined;
  showDropDown = false;

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
  @Input() value = '';
  @Input() exclude = '';
  @Input() isDisabled = false;

  @Output() itemSelect = new EventEmitter<SelectEventArgs>();

  constructor(private eRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initilaized) this.initComponentData();
  }

  ngOnInit(): void {
    this.initComponentData();
  }

  initComponentData() {
    this.localListItems = [
      ...this.listItems.filter((item) => item.value !== this.exclude),
    ];
    this.selectedItem = this.findItemByValue(this.value);
    this.initilaized = true;
  }

  itemTrackBy(index: number, item: ListItem) {
    return item.value;
  }

  onItemSelect(selectData: SelectEventArgs) {
    this.itemSelect.emit(selectData);
    this.showDropDown = false;
    this.selectedItem = this.findItemByValue(selectData.value);
  }
  findItemByValue(value: string) {
    return this.listItems.find((item) => item.value === value);
  }
  toggleDropdown() {
    if (!this.isDisabled) this.showDropDown = !this.showDropDown;
  }
}
