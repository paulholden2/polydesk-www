import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { AngularTokenService } from 'angular-token';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators';
import { FolderSelectComponent } from '../folder/folder-select/folder-select.component';
import { SelectDialogService } from '../select-dialog.service';

enum FileUploadStatus {
  // File has been selected for upload
  Queued = 1,
  // File is pending upload
  Pending,
  // File is currently being uploaded
  InProgress,
  // File upload has succeeded
  Success,
  // File upload has failed
  Failure
};

export class FileUpload {
  constructor(public name: string,
              public data: File,
              public progress: number = 0,
              public status: FileUploadStatus = FileUploadStatus.Queued,
              public error: any = null) { }

  get tooltip(): string {
    if (!this.error) {
      return null;
    }

    let additional = this.error.errors.slice(1).length;
    let moreString = ''

    if (additional > 0) {
      moreString = ` (${additional} more error${additional > 1 ? 's' : ''})`;
    }

    return `${this.error.errors[0].title}${moreString}`;
  }
};

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss']
})
export class DocumentCreateComponent implements OnInit {

  FileUploadStatus = FileUploadStatus

  @ViewChild('fileUploader') fileUploader: ElementRef;
  public queuedFiles: Array<FileUpload> = [];
  public processQueue = false;
  private uploadingIndex = 0;

  public targetFolder: string = '';

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private tokenService: AngularTokenService,
              private selectDialogService: SelectDialogService,
              private dialog: MatDialog,
              private location: Location,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const folder = params.folder;

      if (folder) {
        this.httpClient.get(`folders/${folder}`).subscribe((result: any) => {
          this.targetFolder = result.data.attributes.name;
        });
      } else {
        this.targetFolder = '/'
      }
    });
  }

  goBack() {
    this.location.back();
  }

  openSelectFiles() {
    // Don't allow selection of new files while uploading
    if (this.processQueue == false) {
      this.fileUploader.nativeElement.click();
    }
  }

  openSelectFolderDialog() {
    this.selectDialogService.selectFolder({
      autoFocus: false,
      width: '800px',
      height: '600px'
    }).subscribe((result: any) => {
      // Then navigate to selected folder for upload
      const folder = this.route.snapshot.params.folder;

      if (result === undefined) {
        return;
      }

      let url;

      if (result === 0) {
        url = '../upload';
      } else {
        url = `../${result[0].id}/upload`;
      }

      // If we're navigating away from a folder upload route, the folder
      // ID is in the path, so we need to navigate up another level.
      if (folder) {
        url = `../${url}`;
      }

      this.router.navigate([url], { relativeTo: this.route });
    });
  }

  clearFiles() {
    this.queuedFiles = [];
    this.uploadingIndex = 0;
  }

  selectFiles(event) {
    this.clearFiles();

    for (let i = 0; i < event.target.files.length; ++i) {
      let file = event.target.files[i];

      this.queuedFiles.push(new FileUpload(file.name, file));
    }
  }

  getNextFile() {
    if (!this.processQueue || this.uploadingIndex >= this.queuedFiles.length) {
      return null;
    }

    let file = this.queuedFiles[this.uploadingIndex];

    this.uploadingIndex += 1;

    if (file.status == FileUploadStatus.Pending) {
      return file;
    } else {
      return this.getNextFile();
    }
  }

  manualUploadMessage(i) {
    let file = this.queuedFiles[i];

    if (file.status === FileUploadStatus.Failure) {
      return 'Retry upload';
    } else {
      return 'Upload now';
    }
  }

  // Check if the file at queue index can be uploaded manually
  canManuallyUpload(i) {
    let file = this.queuedFiles[i];

    // Can only upload files that have failed and aren't currently pending upload.
    if (file.status != FileUploadStatus.Queued && file.status != FileUploadStatus.Failure) {
      return false;
    }

    if (this.processQueue) {
      return this.uploadingIndex <= i;
    }

    return true;
  }

  // Start uploading all queued files.
  startUploads() {
    if (this.processQueue) {
      return;
    }

    this.processQueue = true;
    this.uploadingIndex = 0;

    // Mark all queued files as pending
    for (let file of this.queuedFiles) {
      if (file.status === FileUploadStatus.Queued) {
        file.status = FileUploadStatus.Pending;
      }
    }

    this.uploadNextFile();
  }

  // Stop processing the queue. The current upload will complete, after
  // which uploads will cease.
  stopUploads() {
    this.processQueue = false;
  }

  // Upload the next file in the queue that is pending upload.
  uploadNextFile() {
    let file = this.getNextFile();

    if (file) {
      this.uploadFile(file).subscribe(result => {
        this.uploadNextFile();
      }, err => {
        this.uploadNextFile();
      });
    } else {
      this.processQueue = false;
    }
  }

  uploadSingleFile(file) {
    this.uploadFile(file).subscribe();
  }

  uploadFile(file) {
    return Observable.create(observer => {
      file.error = null;
      file.status = FileUploadStatus.InProgress;

      const folder = this.route.snapshot.params.folder;
      let formData = new FormData();

      formData.append('content', file.data);
      formData.append('name', file.name);

      let path;

      if (folder) {
        path = `folders/${folder}/upload`;
      } else {
        path = 'documents/upload';
      }

      return this.httpClient.post(path, formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          let progress = Math.round(100 * event.loaded / event.total);
          file.progress = progress;
        } else if (event instanceof HttpResponse) {
          file.status = FileUploadStatus.Success;
          observer.next(event);
          observer.complete();
        }
      }, err => {
        file.status = FileUploadStatus.Failure;
        file.error = Object.assign({}, err.error);
        observer.error(err);
      });
    });
  }

}
