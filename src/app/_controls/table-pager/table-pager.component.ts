import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

export interface TablePageEvent {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'app-table-pager',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  template: `
    <div class="table-pager-container">
      <ng-container *ngIf="pageCount > 1">
        <ul class="pagination justify-content-center">
          <span class="page-link">Page {{pageIndex+1}} of {{pageCount}}</span>
          <li [ngClass]="hasPrevious ? 'page-item' : 'page-item disabled'">
            <a class="page-link" tabindex="-1" (click)="selectPreviousPage()">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" (click)="selectPage(pageOffset)">{{pageOffset+1}}</a></li>
          <li *ngIf="pageCount>1" class="page-item"><a class="page-link" (click)="selectPage(pageOffset+1)">{{pageOffset+2}}</a></li>
          <li *ngIf="pageCount>2"class="page-item"><a class="page-link" (click)="selectPage(pageOffset+2)">{{pageOffset+3}}</a></li>
          <li *ngIf="pageCount>3"class="page-item"><a class="page-link">...</a></li>
          <li [ngClass]="hasNext ? 'page-item' : 'page-item disabled'">
            <a class="page-link" (click)="selectNextPage()">Next</a>
          </li>
        </ul>
      </ng-container>
    </div>
  `,
  styles: []
})
export class TablePagerComponent {

  @Input() length: number = 100
  @Input() pageIndex: number = 0
  @Input() pageSize: number = 10
  @Input() pageSizeOptions: number[] = [ 10, 20, 50, 100 ]

  @Output() onPageSelect = new EventEmitter<TablePageEvent>()

  pageOffset = 0;

  get hasPrevious(): boolean {
    return this.pageIndex > 0
  }

  get hasNext(): boolean {
    return this.pageIndex < this.pageCount
  }

  get pageCount() : number {
    return ((this.length > 0) && (this.pageSize > 0)) ? Math.floor((this.length + this.pageSize - 1) / this.pageSize) : 0
  }

  selectPage(pageNumber: number) {
    if ((pageNumber >= 0) && (pageNumber < this.pageCount)) {
      this.pageIndex = pageNumber
      this.pageOffset = Math.min(this.pageCount-3, Math.max(0, pageNumber - 1))
      this.onPageSelect.emit({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    }
  }

  selectNextPage() {
    this.selectPage(this.pageIndex + 1)
  }

  selectPreviousPage() {
    this.selectPage(this.pageIndex - 1)
  }
}
