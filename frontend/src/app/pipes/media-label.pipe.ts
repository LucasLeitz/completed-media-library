import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaLabel',
  standalone: true
})
export class MediaLabelPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
