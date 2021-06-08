import { Injectable } from '@angular/core';
import { PageParams, SortParams } from './models/datatable.models';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor() { }

  buildOptions(settings: DataTables.Settings): DataTables.Settings {
    return Object.assign({
      dom: "<'row mb-2'<'col-9 col-lg mt-2 mt-lg-0'f><'col-3 col-lg-auto d-flex justify-content-end align-items-end align-items-lg-center order-5'i>>" +
      "<'row'<'col-sm-12'<'card card-table'<'card-body'<'table-responsive'tr>>>>>" +
      "<'row'<'col-12 d-flex justify-content-center'p>>",
      paging: true,
      responsive: false,
      pagingType: 'simple_numbers',
      pageLength: 10,
      info: true,
      serverSide: true,
      processing: true,
      searching: true,
      ordering: true,
      lengthChange: true,
      searchDelay: 800,
      lengthMenu: [
        [ 5, 10 ],
        [ '5', '10' ]
      ],
      language: {
        searchPlaceholder: "Buscar...",
        search: '',
        info: '_START_ - _END_ / _TOTAL_',
        infoEmpty: "No hay registros",
        lengthMenu: '_MENU_',
        emptyTable: '<div class="d-flex flex-column justify-content-center align-items-center"><img src="assets/images/noResults.svg" alt="No results" class="img-fluid"><h4>No se han encontrado resultados</h4><p class="mb-0">Limpie los filtros e intente nuevamente.</p></div>',
        zeroRecords: '<div class="d-flex flex-column justify-content-center align-items-center"><img src="assets/images/noRecords.svg" alt="No results" class="img-fluid"><h4>En este momento no hay registros.</h4></div>',
        paginate: {
          // first: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>',
          previous: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>', // points to a custom font
          next: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>', // points to a custom font
          // last: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>'
        },
        loadingRecords: '<div class="spinner-border spinner-border-sm text-white mr--2" role="status"><span class="sr-only">Loading...</span></div> Cargando...',
        processing: '<div class="spinner-border spinner-border-sm text-white mr--2" role="status"><span class="sr-only">Loading...</span></div> Procesando',
      }
    },
    settings,
    {
      initComplete: (initSettings, json) => {
        if (settings.initComplete) {
          settings.initComplete(initSettings, json);
        }
      },
      drawCallback: drawSettings => {
        if (settings.drawCallback) {
          settings.drawCallback(drawSettings);
        }
      }
    });
  }

  public getLenguajeConfig(): DataTables.LanguageSettings {
    let config: DataTables.LanguageSettings = {
      info: "Mostrando _START_ a _END_ de _MAX_ Registros",
      search: "Buscar ",
      lengthMenu: "Mostrando _MENU_ Registros",
      infoFiltered: "(filtrado de _MAX_ registros)",
      paginate: {
        first: '<i class="fas fa-angle-double-left"></i>',
        last: '<i class="fas fa-angle-double-right"></i>',
        next: '<i class="far fa-arrow-alt-circle-right"></i>',      
        previous: '<i class="far fa-arrow-alt-circle-left"></i>'
      }
    }

    return config;
  }

  public getPageParams(dataTablesParameters: any): PageParams {
    let pageParamas: PageParams = {
      Skip: dataTablesParameters.start,
      Take: dataTablesParameters.length
    }

    return pageParamas;
  }

  public getSortParamas(dataTablesParameters: any): SortParams {
    let nameCols: string[] = [];
    let sortOrder: number[] = [];
    
    dataTablesParameters.order.forEach(element => {
      let indexCol = element.column;
      let colName = dataTablesParameters.columns[indexCol].name;

      nameCols.push(colName);

      if(element.dir == 'asc')
        sortOrder.push(0);
      else
        sortOrder.push(1);
    });
    
    let sortParams: SortParams = {
      SortBy: nameCols,
      SortDir: sortOrder
    };

    return sortParams;
  }

  public getSearchTableFilter(dataTablesParameters: any): string {
    return dataTablesParameters.search.value;
  }
}
