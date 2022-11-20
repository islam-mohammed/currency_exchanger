import { ListItem } from './../../../models/frontend-models';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'ce-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showDropDown = false;
    }
  }
  @Input() showImage = false;
  @Input() label: string = '';
  @Input() listItems: ListItem[] = [];
  @Input() set value(value: string) {
    this.selectedItem = this.findItemByValue(value.toUpperCase());
  }
  @Input() set exclude(value: string) {
    this.localListItems = [
      ...this.listItems.filter((item) => item.value !== value.toUpperCase()),
    ];
  }

  @Output() itemSelect = new EventEmitter<string>();
  selectedItem: ListItem | undefined = undefined;
  showDropDown = false;
  localListItems: ListItem[] = [];

  constructor(private eRef: ElementRef) {}
  ngOnInit(): void {
    this.localListItems = [...this.listItems];
  }

  itemTrackBy(index: number, item: ListItem) {
    return item.value;
  }

  onItemSelect(value: string) {
    this.itemSelect.emit(value);
    this.showDropDown = false;
    this.selectedItem = this.findItemByValue(value.toUpperCase());
  }
  findItemByValue(value: string) {
    return (
      (this.selectedItem = this.listItems.find(
        (item) => item.value === value
      )) || undefined
    );
  }
}
