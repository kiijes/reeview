import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {

  name: string;
  constructor(private authServ: AuthService) { }

  ngOnInit() {
    this.name = this.authServ.getName();
  }

}
