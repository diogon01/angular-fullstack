import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { AtividadesService } from '../atividades.service';
import { PaginacaoModel } from '../data-model/paginacao.model';
import { Atividade } from '../data-model/atividade.model';


// TODO: Replace this with your own data model type
export interface AtividadesItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: AtividadesItem[] = [
  { id: 1, name: 'Hydrogen' },
  { id: 2, name: 'Helium' },
  { id: 3, name: 'Lithium' },
  { id: 4, name: 'Beryllium' },
  { id: 5, name: 'Boron' },
  { id: 6, name: 'Carbon' },
  { id: 7, name: 'Nitrogen' },
  { id: 8, name: 'Oxygen' },
  { id: 9, name: 'Fluorine' },
  { id: 10, name: 'Neon' },
  { id: 11, name: 'Sodium' },
  { id: 12, name: 'Magnesium' },
  { id: 13, name: 'Aluminum' },
  { id: 14, name: 'Silicon' },
  { id: 15, name: 'Phosphorus' },
  { id: 16, name: 'Sulfur' },
  { id: 17, name: 'Chlorine' },
  { id: 18, name: 'Argon' },
  { id: 19, name: 'Potassium' },
  { id: 20, name: 'Calcium' },
];

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
      });
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
