import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { DataTableComponent } from '../../data-table/data-table.component';
import { FolderApiService } from '../../folder-api.service';

@Component({
  selector: 'app-folder-select',
  templateUrl: './folder-select.component.html',
  styleUrls: ['./folder-select.component.scss']
})
export class FolderSelectComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  private selectFoldersDataTable: DataTableComponent;
  private folderSelectFolders: any;

  constructor(public dialogRef: MatDialogRef<FolderSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private router: Router,
              private folderApiService: FolderApiService) { }

  ngOnInit() {
  }

  goToRoot() {
    this.folderSelectFolders.goToFolder();
  }

  goToParentFolder() {
    this.folderApiService.getParentFolder(this.folderSelectFolders.folderId).subscribe((res: any) => {
      let id;

      if (res.data) {
        id = res.data.id;
      }

      this.folderSelectFolders.goToFolder(id);
    }, err => {
      console.log(err);
    });
  }

  atRootFolder() {
    if (this.folderSelectFolders && this.folderSelectFolders.folderId) {
      return false;
    } else {
      return true;
    }
  }

  onRouterOutletActivate(folderSelectFolders) {
    this.selectFoldersDataTable = folderSelectFolders.selectFolderDataTable;
    this.folderSelectFolders = folderSelectFolders;
  }

  selectFolders() {
    this.dialogRef.close(this.selectFoldersDataTable.selection);
  }

  cancelSelection() {
    this.dialogRef.close();
  }

  selectRoot() {
    this.dialogRef.close(0)
  }

  isAnyFolderSelected() {
    return this.selectFoldersDataTable && this.selectFoldersDataTable.selection.length === 1;
  }

}
