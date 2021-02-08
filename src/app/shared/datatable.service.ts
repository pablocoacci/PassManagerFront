import { Injectable } from '@angular/core';
import { PageParams, SortParams } from './models/datatable.models';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor() { }

  public getPageParams(dataTablesParameters: any): PageParams {
    let pageParamas: PageParams = {
      skip: dataTablesParameters.start,
      take: dataTablesParameters.length
    }

    return pageParamas;
  }

  public getSortParamas(dataTablesParameters: any): SortParams {
    let nameCols: string[] = [];
    let sortOrder: string[] = [];
    
    dataTablesParameters.order.forEach(element => {
      let indexCol = element.column;
      let colName = dataTablesParameters.columns[indexCol].name;

      nameCols.push(colName);
      sortOrder.push(element.dir);
    });
    
    let sortParams: SortParams = {
      sortBy: nameCols,
      sortDir: sortOrder
    };

    return sortParams;
  }

  // private getColumnName(index: number, dataTablesParameters: any): string {

  // }
}
