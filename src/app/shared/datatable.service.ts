import { Injectable } from '@angular/core';
import { PageParams, SortParams } from './models/datatable.models';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor() { }

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
