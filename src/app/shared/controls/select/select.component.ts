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
  @Input() value = '';
  @Output() itemSelect = new EventEmitter<string>();
  selectedItem: ListItem | undefined = undefined;
  showDropDown = false;

  constructor(private eRef: ElementRef) {}
  ngOnInit(): void {
    if (this.value) {
      this.selectedItem = this.findItemByValue(this.value);
    }
  }

  itemTrackBy(index: number, item: ListItem) {
    return item.value;
  }

  onItemSelect(value: string) {
    this.itemSelect.emit(value);
    this.showDropDown = false;
    this.selectedItem = this.findItemByValue(value);
    console.log(this.selectedItem);
  }
  findItemByValue(value: string) {
    return (
      (this.selectedItem = this.listItems.find(
        (item) => item.value === value
      )) || undefined
    );
  }
}
