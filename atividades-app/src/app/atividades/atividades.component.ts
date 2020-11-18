import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AtividadesService } from '../atividades.service';
import { PaginacaoModel } from '../data-model/paginacao.model';
import { AtividadesDataSource, AtividadesItem } from './atividades-datasource';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.css']
})
export class AtividadesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AtividadesItem>;
  @ViewChild('input') input: ElementRef;
  dataSource: AtividadesDataSource;
  paginacaoModel: PaginacaoModel

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'tipo', 'prioridade', 'descricao', 'data'];

  constructor(private atividadesService: AtividadesService) { }

  ngOnInit() {
    this.dataSource = new AtividadesDataSource(this.atividadesService);
    this.dataSource.paginator = this.paginator;
    this.dataSource.loadLessons('', 'asc', 0, 10);


  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    }, 0);

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadLessonsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  onPaginate(pageEvent: PageEvent) {
    this.paginator.pageIndex = pageEvent.pageIndex;
  }

  loadLessonsPage() {
    this.dataSource.loadLessons(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}
