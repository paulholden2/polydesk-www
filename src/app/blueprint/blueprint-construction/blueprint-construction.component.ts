import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlueprintApiService } from '../../blueprint-api.service';

@Component({
  selector: 'app-blueprint-construction',
  templateUrl: './blueprint-construction.component.html',
  styleUrls: ['./blueprint-construction.component.scss']
})
export class BlueprintConstructionComponent implements OnInit {

  schema: any = {};
  model: any = {};
  view: any = {};
  options: any = {};
  blueprintId: string;
  blueprintNamespace: string;

  constructor(public location: Location,
              private blueprintApi: BlueprintApiService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.blueprintApi.getBlueprintByNamespace(params.namespace).subscribe((res: any) => {
        this.blueprintId = res.data[0].id;
        this.blueprintNamespace = res.data[0].attributes.namespace;
        this.schema = res.data[0].attributes.schema;
        this.view = res.data[0].attributes['construction-view'];
      }, res => {
        console.log(res);
      });
    });
  }

  constructPrefab() {
    this.blueprintApi.constructBlueprint(this.blueprintId, this.blueprintNamespace, this.model).subscribe((res: any) => {
      console.log(res);
    }, res => {
      console.error(res);
    })
  }

}
