import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResponseStatus } from '../models/response/base-response.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  constructor(private readonly apiService: ApiService, private router: Router,private authService: AuthService ,   private messageService: MessageService,) {
    this.currentUser = null;
  }

  users: User[] = [];

  currentContent: string = 'home';
 
  currentUser: User | null;


  ngOnInit(): void {
    this.refresh();
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }


  refresh() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
      console.log(this.users)
    });
  }

  
}
