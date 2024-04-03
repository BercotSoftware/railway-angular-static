import {BehaviorSubject, map, merge, Observable} from "rxjs";
import {TablePageEvent} from "./table-pager.component";
import {Pageable} from "@golf-api";
import {EventEmitter} from "@angular/core";

export interface PagedResult<T> {
  totalItems?: number,
  items: T[] | undefined
}

/**
 * Data source to attach to server-side paging things like http
 */
export class TableDataSource<T> {

  dataSubject: BehaviorSubject<T[]>
  data$: Observable<T[]>

  public pageIndex : number = 0
  public pageSize = 20
  private sortActive: string;
  private sortDirection: string;

  private pageEvent = new EventEmitter<void>()
  private sortEvent = new EventEmitter<void>()

  constructor(options?: { pageSize?: number, data?: Array<T> | undefined }) {
    this.pageSize = options?.pageSize || 20
    this.dataSubject = new BehaviorSubject<T[]>(options?.data || [])
    this.data$ = this.dataSubject.asObservable()
  }

  public get totalItems() : number {
    return this.dataSubject.value.length
  }

  public loadData(data?: Array<T>) {
    this.dataSubject.next(data || [])
  }

  public onPageSelect($event: TablePageEvent) {
    this.pageIndex = $event.pageIndex
    this.pageSize = $event.pageSize
    this.pageEvent.emit()
  }

  public onSort($event: { active: string, direction: string }) {
    this.sortActive = $event.active
    this.sortDirection = $event.direction
    this.sortEvent.emit()
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  get displayData(): Observable<T[]> {
      // See https://www.learnrxjs.io/learn-rxjs/operators/combination/merge
      return merge(this.data$, this.pageEvent, this.sortEvent)
        .pipe(map((result) => {
          return this.getPagedData(this.getSortedData([...this.dataSubject.value]));
        }));
    // return this.data$
  }

  get pageCount() : number {
    const totalItems = this.totalItems
    const pageSize = this.pageSize
    return ((totalItems > 0) && (pageSize > 0)) ? Math.floor((totalItems + pageSize - 1) / pageSize) : 0
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: T[]): T[] {
      const startIndex = this.pageIndex * this.pageSize;
      return data.splice(startIndex, this.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  protected getSortedData(input: T[]): T[] {

    if (!this.sortActive || this.sortDirection === '') {
      return input;
    }

    return input.sort((a, b) => {
      const isAsc = this.sortDirection === 'asc';
      const sortField = this.sortActive
      // @ts-ignore
      return a[sortField] < b[sortField] ? -1 : a[sortField] > b[sortField] ? 1 : 0;
    });
  }
}
