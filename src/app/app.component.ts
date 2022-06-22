import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserInterface } from './interfaces/userInterface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular_interview';
  Data = [];
  resultsLength = 0;

  dataSource = new MatTableDataSource<UserInterface>(this.Data);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  displayedColumns: string[] = ['name', 'gender', 'location', 'email', 'current_age', 'registration', 'phone', 'picture'];

  isLoadingResults = false;

  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    //calling getData function
    this.getData();
    // console.log(this.Data);
  }

  //subscribe to the service class to get data
  getData() {
    let resp = this.api.getUserInformation();
    resp.subscribe((response: any) => {
      this.dataSource.data = response.results as UserInterface[];
    })
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
