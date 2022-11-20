import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'symbole' })
export class SymbolePipe implements PipeTransform {
  transform(value: string): string {
    return value.substring(3);
  }
}
