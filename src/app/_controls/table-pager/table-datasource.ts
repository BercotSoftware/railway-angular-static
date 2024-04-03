import {BehaviorSubject, Observable} from "rxjs";
import {TablePageEvent} from "./table-pager.component";
import {Pageable} from "@golf-api";

export interface PagedResult<T> {
  totalItems?: number,
  page?: number,
  size?: number,
  items: T[] | undefined
}

export class TableDataSource<T> implements Pageable {

  dataSubject = new BehaviorSubject<T[]>([])
  data$ = this.dataSubject.asObservable()

  public page : number = 0
  public size = 20
  public sort: Array<string>

  constructor(private dataSource: (pageIndex: number, pageSize: number) => Promise<PagedResult<T>>, pageSize?: number) {
    this.size = pageSize || 100

    this.loadData(this.page, this.size)
  }

  private async loadData(pageIndex: number, pageSize: number) {
    try {
      const pagedResult = await this.dataSource(pageIndex, pageSize);
      this.page = pageIndex
      this.size = pageSize
      this.dataSubject.next(pagedResult.items || [])
    } catch (e) {
      this.page = 0
      this.dataSubject.next([])
    }
  }

  public onPageSelect($event: TablePageEvent) {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    this.loadData($event.pageIndex, $event.pageSize)
  }

  get data() : T[] {
    return this.dataSubject.value
  }

  get totalItems() : number {
    return this.dataSubject.value.length
  }

  get pageCount() : number {
    const totalItems = this.totalItems
    const pageSize = this.size
    return ((totalItems > 0) && (pageSize > 0)) ? Math.floor((totalItems + pageSize - 1) / pageSize) : 0
  }

}
