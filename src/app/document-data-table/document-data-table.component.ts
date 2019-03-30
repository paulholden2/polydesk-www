import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-data-table',
  templateUrl: './document-data-table.component.html',
  styleUrls: ['./document-data-table.component.scss']
})
export class DocumentDataTableComponent implements OnInit {

  data = {
    resource: 'folders',
    selectable: true,
    columns: {
      id: {
        title: 'ID',
        display: 'text',
        type: 'id'
      },
      type: {
        title: 'Type',
        display: 'icon',
        type: 'literal',
        value: 'file-document-outline'
      },
      name: {
        title: 'Name',
        display: 'link',
        type: 'attribute',
        value: 'name'
      },
      createdAt: {
        title: 'Created At',
        display: 'date',
        format: 'MM/DD/YYYY hh:mm A',
        type: 'attribute',
        value: 'created_at'
      },
      updatedAt: {
        title: 'Updated At',
        display: 'date',
        format: 'MM/DD/YYYY hh:mm A',
        type: 'attribute',
        value: 'updated_at'
      },
      literalData: {
        title: 'Literal Data that has a really long header, like really really long',
        display: 'text',
        type: 'literal',
        value: 'Some text'
      },
      documents: {
        title: 'Documents',
        display: 'modal',
        type: 'relationship',
        model: 'documents',
        view: {
        }
      }
    },
    display: [
      {
        name: 'id',
        width: 30
      },
      {
        name: 'type',
        width: 50
      },
      {
        name: 'name',
        width: 100
      },
      {
        name: 'createdAt',
        width: 80
      },
      {
        name: 'updatedAt',
        width: 160
      },
      {
        name: 'literalData',
        width: 40
      },
      {
        name: 'documents',
        width: 100
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}
