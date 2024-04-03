import {BehaviorSubject} from "rxjs";
import {TablePageEvent} from "./table-pager.component";
import {Pageable} from "@golf-api";

export interface PagedResult<T> {
  totalItems?: number,
  items: T[] | undefined
}

export class TableDataSource<T> {

  dataSubject = new BehaviorSubject<T[]>([])
  data$ = this.dataSubject.asObservable()

  public page : number = 0
  public size = 20
  public sort: Array<string>
  public totalItems = 0

  constructor(private dataProvider: (pageOptions: Pageable) => Promise<PagedResult<T>>, pageSize?: number) {
    this.size = pageSize || 100
  }

  public getPageOptions() : Pageable {
    return {
      page: this.page,
      size: this.size,
      sort: this.sort
    }
  }

  public loadData() {
    try {
      const pageOptions = {
        page: this.page,
        size: this.size,
        sort: this.sort
      }

      this.dataProvider(pageOptions)
        .then((result) => {
          this.dataSubject.next(result.items || [])
          this.totalItems = result.totalItems || 0
        });
    } catch (e) {
      this.page = 0
      this.dataSubject.next([])
    }
  }

  public onPageSelect($event: TablePageEvent) {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    this.loadData()
  }

  get data() : T[] {
    return this.dataSubject.value
  }

  get pageCount() : number {
    const totalItems = this.totalItems
    const pageSize = this.size
    return ((totalItems > 0) && (pageSize > 0)) ? Math.floor((totalItems + pageSize - 1) / pageSize) : 0
  }

}
