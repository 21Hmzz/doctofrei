import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterColor'
})
export class FirstLetterColorPipe implements PipeTransform {

  transform(value: string, color: string = 'red'): string {
    if (!value) return value;

    const firstLetter = value.charAt(0);
    const restOfString = value.slice(1);
    return `<span style="color:${color}">${firstLetter}</span>${restOfString}`;
  }

}
