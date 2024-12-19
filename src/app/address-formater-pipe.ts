import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFormatter'
})
export class AddressFormatterPipe implements PipeTransform {

  transform(address: string, phone: string): string {
    if (!address) {
      return '';
    }
    if (!phone) {
      return address; // Retourne juste l'adresse si le téléphone n'est pas fourni
    }
    return `${address} (${phone})`;
  }

}
