import { Component } from '@angular/core';

import { Tweets } from '../models/tweet.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tweets : Tweets[]=[]
  users : User[]=[]
}
