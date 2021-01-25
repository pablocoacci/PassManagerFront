import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {

  // @ViewChild('deletePasswordModal') deleteModal; 
  dtOptions: DataTables.Settings = {};
  dataTest = [
    {
      "id": 860,
      "firstName": "Superman",
      "lastName": "Yoda"
    },
    {
      "id": 870,
      "firstName": "Foo",
      "lastName": "Whateveryournameis"
    },
    {
      "id": 590,
      "firstName": "Toto",
      "lastName": "Titi"
    },
	{
      "id": 860,
      "firstName": "Petter",
      "lastName": "Parker"
    },
    {
      "id": 870,
      "firstName": "Bruce",
      "lastName": "Banner"
    },
    {
      "id": 590,
      "firstName": "Steve",
      "lastName": "Rogers"
    },
	{
      "id": 860,
      "firstName": "Tony",
      "lastName": "Stark"
    },
    {
      "id": 870,
      "firstName": "Steven",
      "lastName": "Strange"
    },
    {
      "id": 590,
      "firstName": "Leonardo",
      "lastName": "Da Vincci"
    },
	{
      "id": 860,
      "firstName": "Gandalf",
      "lastName": "El Gris"
    },
    {
      "id": 870,
      "firstName": "Matt",
      "lastName": "Murdock"
    },
    {
      "id": 590,
      "firstName": "Pepe",
      "lastName": "Marmota"
    }
  ];

  constructor() { }

  ngOnInit(): void {

    this.dtOptions = {
      // pagingType: 'full_numbers',
      // pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        
        callback({
          recordsTotal: 12,
          recordsFiltered: 12,
          data: this.dataTest
        });
      },
      columns: [
      {
        title: 'ID',
        data: 'id'
      }, 
      {
        title: 'First name',
        data: 'firstName'
      }, 
      {
        title: 'Last name',
        data: 'lastName'
      },
      {
        title: 'Action',
        name: 'id',
        data: 'id',
        orderable: false,
        render: (id: string) => '<a name="btnDetailPass" href="javascript:void(0);" style="margin-left: 15px; margin-right: 15px;"><i class="fas fa-edit"></i></a><a name="btnDeletePass" href="javascript:void(0);"><i class="fas fa-trash-alt"></i></a>'
      }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {

        $('[name="btnDetailPass"]', row).bind('click', () => {
          console.log(data);
          // En data esta toda la informacion del objeto de la fila a la que se le hizo click
          this.showDetailModal();
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

  showDetailModal(): void {
    $('#detailPasswordtModal').modal('show');
  }
}
