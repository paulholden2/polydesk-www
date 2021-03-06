import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTabModule } from './home-page/router-tab/router-tab.module';
import { ApiModule } from './api.module';
import { AngularTokenService, AngularTokenModule } from 'angular-token';
import { environment } from '../environments/environment';
import { AceEditorModule } from 'ng2-ace-editor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyFlexLayoutType } from './formly-flex-layout-type';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgmCoreModule } from '@agm/core';
import { AngularResizedEventModule } from 'angular-resize-event';

import { MaterialModule } from './material.module';

import { AccountService } from './account.service';
import { DocumentApiService } from './document-api.service';
import { FolderApiService } from './folder-api.service';
import { FormApiService } from './form-api.service';
import { FormSubmissionApiService } from './form-submission-api.service';
import { SelectDialogService } from './select-dialog.service';
import { JsonAccessorService } from './json-accessor.service';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TopbarBrandComponent } from './topbar/topbar-brand/topbar-brand.component';
import { TopbarActionsComponent } from './topbar/topbar-actions/topbar-actions.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentComponent } from './document/document.component';
import { DocumentBrowserComponent } from './document/document-browser/document-browser.component';
import { FolderTreeComponent } from './folder-tree/folder-tree.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginComponent } from './auth-dialog/login/login.component';
import { SignupComponent } from './auth-dialog/signup/signup.component';
import { ReportComponent } from './report/report.component';
import { ReportListComponent } from './report/report-list/report-list.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { FormComponent } from './form/form.component';
import { WorkflowListComponent } from './workflow/workflow-list/workflow-list.component';
import { FormListComponent } from './form/form-list/form-list.component';
import { FolderComponent } from './folder/folder.component';
import { ResizeColumnDirective } from './resize-column.directive';
import { CreateFolderComponent } from './folder/create-folder/create-folder.component';
import { FormSubmitComponent } from './form-submit/form-submit.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableCellComponent } from './data-table/data-table-cell/data-table-cell.component';
import { DataTableDialogComponent } from './data-table/data-table-dialog/data-table-dialog.component';
import { ConfirmationsComponent } from './confirmations/confirmations.component';
import { DocumentCreateComponent } from './document-create/document-create.component';
import { FolderSelectComponent } from './folder/folder-select/folder-select.component';
import { FolderConfirmDeleteComponent } from './folder/folder-confirm-delete/folder-confirm-delete.component';
import { AccountComponent } from './account/account.component';
import { AccountCreateComponent } from './account/account-create/account-create.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { FormConfirmDeleteComponent } from './form-confirm-delete/form-confirm-delete.component';
import { FormWidgetObjectComponent } from './form/form-widget/form-widget-object/form-widget-object.component';
import { PrefabFormArrayComponent } from './prefab/prefab-form/prefab-form-array/prefab-form-array.component';
import { FormWidgetFolderReferenceComponent } from './form/form-widget/form-widget-folder-reference/form-widget-folder-reference.component';
import { FormSubmissionComponent } from './form-submission/form-submission.component';
import { FormSubmissionListComponent } from './form-submission/form-submission-list/form-submission-list.component';
import { FormWidgetFormSubmissionReferenceComponent } from './form/form-widget/form-widget-form-submission-reference/form-widget-form-submission-reference.component';
import { FormSubmissionSelectComponent } from './form-submission/form-submission-select/form-submission-select.component';
import { FormEmbedComponent } from './form/form-embed/form-embed.component';
import { PrefabFormSliderComponent } from './prefab/prefab-form/prefab-form-slider/prefab-form-slider.component';
import { PrefabFormDatepickerComponent } from './prefab/prefab-form/prefab-form-datepicker/prefab-form-datepicker.component';
import { DataTableRouteBindingComponent } from './data-table/data-table-route-binding/data-table-route-binding.component';
import { DataTableBindingComponent } from './data-table/data-table-binding/data-table-binding.component';
import { FormWidgetMapPointComponent } from './form/form-widget/form-widget-map-point/form-widget-map-point.component';
import { FormWidgetMapPolylineComponent } from './form/form-widget/form-widget-map-polyline/form-widget-map-polyline.component';
import { FormWidgetMapComponent } from './form/form-widget/form-widget-map/form-widget-map.component';
import { FormWidgetMapNewLayerComponent } from './form/form-widget/form-widget-map/form-widget-map-new-layer/form-widget-map-new-layer.component';
import { FormWidgetMapPolylineWrapperComponent } from './form/form-widget/form-widget-map/form-widget-map-polyline-wrapper/form-widget-map-polyline-wrapper.component';
import { PrefabComponent } from './prefab/prefab.component';
import { PrefabFormComponent } from './prefab/prefab-form/prefab-form.component';
import { PrefabFormLabelComponent } from './prefab/prefab-form/prefab-form-label/prefab-form-label.component';
import { PrefabFormInputComponent } from './prefab/prefab-form/prefab-form-input/prefab-form-input.component';
import { PrefabFormRowComponent } from './prefab/prefab-form/prefab-form-row/prefab-form-row.component';
import { PrefabFormColumnComponent } from './prefab/prefab-form/prefab-form-column/prefab-form-column.component';
import { PrefabFormContainerComponent } from './prefab/prefab-form/prefab-form-container/prefab-form-container.component';
import { PrefabFormMediaLayerComponent } from './prefab/prefab-form/prefab-form-media-layer/prefab-form-media-layer.component';
import { DeskComponent } from './desk/desk.component';
import { BlueprintComponent } from './blueprint/blueprint.component';
import { BlueprintConstructionComponent } from './blueprint/blueprint-construction/blueprint-construction.component';
import { BlueprintEditComponent } from './blueprint/blueprint-edit/blueprint-edit.component';
import { PrefabEditComponent } from './prefab/prefab-edit/prefab-edit.component';
import { PrefabMigrationHistoryComponent } from './prefab/prefab-migration-history/prefab-migration-history.component';
import { PrefabMigrationEventComponent } from './prefab/prefab-migration-event/prefab-migration-event.component';
import { BlueprintMigrationsComponent } from './blueprint/blueprint-migrations/blueprint-migrations.component';
import { BlueprintMigrationCreateComponent } from './blueprint/blueprint-migration-create/blueprint-migration-create.component';
import { BlueprintMigrationViewComponent } from './blueprint/blueprint-migration-view/blueprint-migration-view.component';
import { BlueprintMigrationEditComponent } from './blueprint/blueprint-migration-edit/blueprint-migration-edit.component';
import { BlueprintCreateComponent } from './blueprint/blueprint-create/blueprint-create.component';
import { BlueprintComposerComponent } from './blueprint/blueprint-composer/blueprint-composer.component';
import { BlueprintComposerJsonEditorComponent } from './blueprint/blueprint-composer/blueprint-composer-json-editor/blueprint-composer-json-editor.component';
import { MapTestComponent } from './map-test/map-test.component';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
  {
    path: 'documentation',
    component: DocumentationComponent
  },
  {
    path: 'maptest',
    component: MapTestComponent
  },
  {
    path: 'confirmations/:confirmationToken',
    component: ConfirmationsComponent
  },
  {
    path: 'accounts',
    children: [
      {
        path: '',
        component: AccountListComponent
      },
      {
        path: ':account',
        component: HomePageComponent,
        children: [
          {
            path: 'blueprints/new',
            component: BlueprintCreateComponent
          },
          {
            path: 'desk',
            children: [
              {
                path: '',
                component: DeskComponent,
              },
              {
                path: ':namespace',
                children: [
                  {
                    path: '',
                    component: BlueprintComponent
                  },
                  {
                    path: 'edit',
                    component: BlueprintEditComponent
                  },
                  {
                    path: 'new',
                    component: BlueprintConstructionComponent
                  },
                  {
                    path: 'migrations',
                    children: [
                      {
                        path: '',
                        component: BlueprintMigrationsComponent
                      },
                      {
                        path: 'new',
                        component: BlueprintMigrationCreateComponent
                      },
                      {
                        path: ':migration',
                        children: [
                          {
                            path: '',
                            component: BlueprintMigrationViewComponent
                          },
                          {
                            path: 'edit',
                            component: BlueprintMigrationEditComponent
                          }
                        ]
                      }
                    ]
                  },
                  {
                    path: ':tag',
                    children: [
                      {
                        path: '',
                        component: PrefabComponent
                      },
                      {
                        path: 'edit',
                        component: PrefabEditComponent
                      },
                      {
                        path: 'migrations',
                        children: [
                          {
                            path: '',
                            component: PrefabMigrationHistoryComponent
                          },
                          {
                            path: ':migration',
                            component: PrefabMigrationEventComponent
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'folders',
            component: DocumentBrowserComponent,
            children: [
              {
                path: '',
                component: FolderComponent
              },
              {
                path: 'upload',
                component: DocumentCreateComponent
              },
              {
                path: ':folder',
                component: FolderComponent
              },
              {
                path: ':folder/upload',
                component: DocumentCreateComponent
              }
            ]
          },
          {
            path: 'reports',
            component: ReportListComponent
          },
          {
            path: 'documents/upload',
            component: DocumentCreateComponent
          },
          {
            path: 'documents/:id',
            component: DocumentComponent
          },
          {
            path: 'workflows',
            component: WorkflowListComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TopbarBrandComponent,
    TopbarActionsComponent,
    HomePageComponent,
    DashboardComponent,
    DocumentComponent,
    DocumentBrowserComponent,
    FolderTreeComponent,
    FolderComponent,
    AuthDialogComponent,
    LoginComponent,
    SignupComponent,
    ReportComponent,
    ReportListComponent,
    WorkflowComponent,
    FormComponent,
    WorkflowListComponent,
    FormListComponent,
    ResizeColumnDirective,
    CreateFolderComponent,
    FormSubmitComponent,
    FormEditComponent,
    DataTableComponent,
    DataTableCellComponent,
    DataTableDialogComponent,
    ConfirmationsComponent,
    DocumentCreateComponent,
    FolderSelectComponent,
    FolderConfirmDeleteComponent,
    AccountComponent,
    AccountCreateComponent,
    AccountListComponent,
    FormlyFlexLayoutType,
    FormConfirmDeleteComponent,
    FormWidgetObjectComponent,
    PrefabFormArrayComponent,
    FormWidgetFolderReferenceComponent,
    FormSubmissionComponent,
    FormSubmissionListComponent,
    FormWidgetFormSubmissionReferenceComponent,
    FormSubmissionSelectComponent,
    FormEmbedComponent,
    PrefabFormSliderComponent,
    PrefabFormDatepickerComponent,
    DataTableRouteBindingComponent,
    DataTableBindingComponent,
    FormWidgetMapPointComponent,
    FormWidgetMapPolylineComponent,
    FormWidgetMapComponent,
    FormWidgetMapNewLayerComponent,
    FormWidgetMapPolylineWrapperComponent,
    PrefabComponent,
    PrefabFormComponent,
    PrefabFormLabelComponent,
    PrefabFormInputComponent,
    PrefabFormRowComponent,
    PrefabFormColumnComponent,
    PrefabFormContainerComponent,
    PrefabFormMediaLayerComponent,
    DeskComponent,
    BlueprintComponent,
    BlueprintConstructionComponent,
    BlueprintEditComponent,
    PrefabEditComponent,
    PrefabMigrationHistoryComponent,
    PrefabMigrationEventComponent,
    BlueprintMigrationsComponent,
    BlueprintMigrationCreateComponent,
    BlueprintMigrationViewComponent,
    BlueprintMigrationEditComponent,
    BlueprintCreateComponent,
    BlueprintComposerComponent,
    BlueprintComposerJsonEditorComponent,
    MapTestComponent,
    DocumentationComponent
  ],
  entryComponents: [
    AccountCreateComponent,
    AuthDialogComponent,
    CreateFolderComponent,
    DataTableDialogComponent,
    FolderConfirmDeleteComponent,
    FolderSelectComponent,
    FormSubmissionSelectComponent,
    FormConfirmDeleteComponent,
    TopbarActionsComponent,
    FormWidgetMapNewLayerComponent,
    PrefabFormInputComponent,
    PrefabFormColumnComponent,
    PrefabFormRowComponent
  ],
  imports: [
    AceEditorModule,
    AngularResizedEventModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    // ApiModule must be imported befor AngularTokenModule, otherwise
    // AngularTokenInjector will see requests going out to a URL that doesn't
    // start with the configured apiBase and not apply auth headers.
    ApiModule,
    AngularTokenModule.forRoot(environment.tokenAuthConfig),
    MaterialModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        // { name: 'flex-layout', component: FormlyFlexLayoutType },
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            }
          }
        },
        {
          name: 'prefab',
          extends: 'input'
        },
        { name: 'enum', extends: 'select' },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'object', component: FormWidgetObjectComponent },
        { name: 'label', component: PrefabFormLabelComponent },
        { name: 'array', component: PrefabFormArrayComponent },
        { name: 'polydesk-folder', component: FormWidgetFolderReferenceComponent },
        { name: 'polydesk-form-submission', component: FormWidgetFormSubmissionReferenceComponent },
        { name: 'slider', component: PrefabFormSliderComponent },
        { name: 'datepicker', component: PrefabFormDatepickerComponent },
        { name: 'map-point', component: FormWidgetMapPointComponent },
        { name: 'map-polyline', component: FormWidgetMapPolylineComponent },
        { name: 'map', component: FormWidgetMapComponent },
        { name: 'input', component: PrefabFormInputComponent },
        { name: 'row', component: PrefabFormRowComponent },
        { name: 'column', component: PrefabFormColumnComponent }
      ]
    }),
    // FormlyMaterialModule,
    FormlyMatSliderModule,
    RouterModule.forRoot(routes),
    RouterTabModule,
    PdfViewerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    })
  ],
  providers: [
    AngularTokenModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
