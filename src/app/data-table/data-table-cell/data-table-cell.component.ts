import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DataTableDialogComponent } from '../data-table-dialog/data-table-dialog.component';
import * as Url from 'url';

import * as moment from 'moment';

@Component({
  selector: 'app-data-table-cell',
  templateUrl: './data-table-cell.component.html',
  styleUrls: ['./data-table-cell.component.scss']
})
export class DataTableCellComponent implements OnInit {

  @Input() data: any;
  @Input() row: any;
  @Input() column: any;
  @Input() outlet: string | null;

  constructor(public dialog: MatDialog,
              public router: Router) { }

  get value(): any {
    let columnInfo = this.column;
    let val = this.raw;

    switch (this.columnDisplay) {
      case 'date':
        let m = moment(val);
        if (columnInfo.format) {
          val = m.format(columnInfo.format);
        } else {
          val = moment.duration(m.diff(moment())).humanize(true);
        }

        break;
      case 'switch':
        if (val == null) {
          val = columnInfo.case.null;
        } else {
          val = columnInfo.case[val];
        }

        break;
      default:
        ;
    }

    if (typeof val === 'undefined') {
      if (typeof columnInfo.default !== 'undefined') {
        val = columnInfo.default;
      } else {
        val = { type: 'literal', value: '', display: 'text' };
      }
    }

    return val;
  }

  get raw(): any {
    return this.resolveArg(this.column);
  }

  get selfLink(): string {
    if (this.column.pathPrefix) {
      return `${this.column.pathPrefix}/${this.row.id}`;
    } else {
      return this.row.id;
    }
  }

  getTooltip() {
    const tooltip = this.column.tooltip;

    if (tooltip == null) {
      return null;
    } else if (typeof tooltip === 'string') {
      return tooltip;
    } else if (typeof tooltip === 'object') {
      let string = tooltip.format;

      tooltip.args.forEach((arg, idx) => {
        let regexp = new RegExp(`([^\\$]|^)\\$${idx + 1}`);
        string = string.replace(regexp, `$1${this.resolveArg(arg)}`)
      });

      return string.replace('$$', '$');
    }
  }

  resolveArg(arg) {
    let columnInfo = arg;

    switch (columnInfo.type) {
      case 'id':
        return this.row.id;
      case 'type':
        return this.row.type;
      case 'attribute':
        return this.row.attributes[columnInfo.value];
      case 'literal':
        return columnInfo.value;
      case 'relationship':
        let path = Url.parse(this.row.relationships[columnInfo.model].links.related).pathname;
        return path.split('/').slice(2).join('/');
      default:
        return '';
    }
  }

  routeTo() {
    // Skip updating location if routing is occurring in a named outlet
    this.router.navigate(this.getRouterLink(), {
      skipLocationChange: !!this.outlet
    });
  }

  getRouterLink() {
    let outlets = {};

    if (this.outlet) {
      outlets[this.outlet] = this.selfLink;
      return [ '', { outlets: outlets } ];
    } else {
      outlets[this.outlet] = null;
      return [ this.selfLink, { outlets: outlets } ];
    }
  }

  ngOnInit() {
  }

  get columnDisplay() {
    return this.column.display;
  }

  showLink(column): boolean {
    return this.column.link;
  }

  openRelationshipDialog() {
    let columnInfo = this.column;
    let data: any = {};

    Object.assign(data, columnInfo.view);
    data.resource = this.value;

    let dialogRef = this.dialog.open(DataTableDialogComponent, {
      width: '100vw',
      data: data
    });
  }

}
