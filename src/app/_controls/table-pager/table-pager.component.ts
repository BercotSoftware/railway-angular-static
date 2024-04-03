import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-table-pager',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <div class="table-pager-container">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" (click)="selectPage(1)">1</a></li>
        <li *ngIf="pageCount>1" class="page-item"><a class="page-link" (click)="selectPage(2)">2</a></li>
        <li *ngIf="pageCount>2"class="page-item"><a class="page-link" (click)="selectPage(3)">3</a></li>
        <li *ngIf="pageCount>3"class="page-item"><a class="page-link">...</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
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

  @Output() onPageSelect = new EventEmitter<number>()

  get pageCount() : number {
    return ((this.length > 0) && (this.pageSize > 0)) ? (this.length / this.pageSize) : 0
  }

  selectPage(page: number) {
    this.onPageSelect.emit(page)
  }

}
