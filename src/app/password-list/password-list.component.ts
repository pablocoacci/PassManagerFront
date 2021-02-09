import { LoadingService } from './../shared/loading/loading.service';
import { SortParams } from './../shared/models/datatable.models';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableService } from '../shared/datatable.service';
import { PasswordsDalService } from '../shared/passwords-dal.service';
import { PasswordDetail } from '../shared/models/passwords-dal.model';

declare var $: any;

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  passwordDetail: PasswordDetail = null;

  constructor(
    private datatableService: DatatableService,
    private passwordService: PasswordsDalService,
    private loadingService: LoadingService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: this.datatableService.getLenguajeConfig(),
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {

        let page = this.datatableService.getPageParams(dataTablesParameters);
        let sort = this.datatableService.getSortParamas(dataTablesParameters);
        let searchFilter = this.datatableService.getSearchTableFilter(dataTablesParameters);

        this.passwordService.getPasswordsList(page, sort, searchFilter).subscribe(resp => {

          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: resp.data.results
          });
        });
      },
      columns: [
      {
        visible: false,
        title: 'ID',
        data: 'passwordSiteId',
        name: 'passwordSiteId'
      }, 
      {
        title: 'Sitio',
        data: 'nameSite',
        name: 'nameSite'
      }, 
      {
        title: 'User Name',
        data: 'userNameSite',
        name: 'userNameSite'
      },
      {
        title: 'Password',
        data: 'password',
        name: 'password'
      },
      {
        title: 'Action',
        name: 'action',
        data: 'action',
        orderable: false,
        render: (id: string) => '<a name="btnDetailPass" href="javascript:void(0);" style="margin-left: 15px; margin-right: 15px;"><i class="far fa-eye"></i></a><a name="btnEditPass" href="javascript:void(0);" style="margin-right: 15px;"><i class="fas fa-edit"></i></a><a name="btnDeletePass" href="javascript:void(0);"><i class="fas fa-trash-alt"></i></a>'
      }],
      rowCallback: (row: Node, data: any | Object, index: number) => {

        $('[name="btnDetailPass"]', row).bind('click', () => {
          this.showDetailModal(data.passwordSiteId);
        });

        $('[name="btnDeletePass"]', row).bind('click', () => {
          console.log(data);
          // En data esta toda la informacion del objeto de la fila a la que se le hizo click
          this.showDeleteModal();
        });

      }
    };
  }

  showDeleteModal(): void {
    $('#deletePasswordtModal').modal('show');
  }

  showDetailModal(passwordId: string): void {
    this.loadingService.show();
    this.passwordService.getPasswordDetail(passwordId).subscribe(resp => {
      this.passwordDetail = resp.data;

      console.log(this.passwordDetail.nameSite);

      $('#detailPasswordtModal').modal('show');
      this.loadingService.hide();
    })
  }
}
