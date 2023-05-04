import { Component, Input } from '@angular/core';

import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './table.component.html',
  styles: [
    `
      img {
        width: 35px;
      }
    `,
  ],
})
export class TableComponent {
  @Input()
  public countries?: Country[] = [];

  @Input()
  public isLoading: boolean = false;
}
