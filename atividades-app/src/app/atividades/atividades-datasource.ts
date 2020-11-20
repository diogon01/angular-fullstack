import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { AtividadesService } from '../atividades.service';
import { PaginacaoModel } from '../data-model/paginacao.model';
import { Atividade } from '../data-model/atividade.model';
import { SelectionModel } from '@angular/cdk/collections';


/**
 * Data source for the Atividades view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AtividadesDataSource extends DataSource<Atividade> {
  data: Atividade[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  private lessonsSubject = new BehaviorSubject<Atividade[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingpIndex = new BehaviorSubject<number>(1);
  public loading$ = this.loadingSubject.asObservable();
  private totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();
  public pIndex$ = this.loadingpIndex.asObservable();
  selection = new SelectionModel<Atividade>(true, []);

  constructor(private atividadesService: AtividadesService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Atividade[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return this.lessonsSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }



  loadLessons(filter: string, sortDirection: string, pageIndex: number, pageSize: number) {

    this.loadingSubject.next(true);

    this.atividadesService.findLessons(filter, sortDirection,
      pageIndex, pageSize).pipe(
        catchError(() => observableOf([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((atividades: PaginacaoModel) => {
        this.lessonsSubject.next(atividades.data);
        this.totalSubject.next(atividades.total);
        this.selection.clear()
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Atividade): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
