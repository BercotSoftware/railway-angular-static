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
      <ul class="pagination justify-content-center">
        <li [ngClass]="hasPrevious ? 'page-item' : 'page-item disabled'">
          <a class="page-link" tabindex="-1" (click)="selectPreviousPage()">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" (click)="selectPage(pageOffset)">1</a></li>
        <li *ngIf="pageCount>1" class="page-item"><a class="page-link" (click)="selectPage(pageOffset + 1)">2</a></li>
        <li *ngIf="pageCount>2"class="page-item"><a class="page-link" (click)="selectPage(pageOffset + 2)">3</a></li>
        <li *ngIf="pageCount>3"class="page-item"><a class="page-link">...</a></li>
        <li [ngClass]="hasNext ? 'page-item' : 'page-item disabled'">
          <a class="page-link" (click)="selectNextPage()">Next</a>
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class TablePagerComponent {

  @Input() length = 100
  @Input() pageIndex = 0
  @Input() pageSize = 10
  @Input() pageSizeOptions = [ 10, 20, 50, 100 ]

  @Output() onPageSelect = new EventEmitter<TablePageEvent>()

  pageOffset = 1;

  get hasPrevious(): boolean {
    return this.pageIndex > 0
  }

  get hasNext(): boolean {
    return this.pageIndex < this.pageCount
  }

  get pageCount() : number {
    return ((this.length > 0) && (this.pageSize > 0)) ? (this.length / this.pageSize) : 0
  }

  selectPage(page: number) {
    // if ((this.pageIndex + page) < (this.pageCount - 1)) {
    //   this.onPageSelect.emit(page)
    // }
  }

  selectNextPage() {
    if (this.pageIndex < (this.pageCount - 1)) {
      this.pageIndex += 1
      this.onPageSelect.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize})
    }
  }

  selectPreviousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex -= 1
      this.onPageSelect.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize})
    }
  }
}
