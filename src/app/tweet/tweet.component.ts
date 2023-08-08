
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { User } from 'src/app/models/user.model';
import { Tweets } from '../models/tweet.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ResponseStatus } from '../models/response/base-response.model';
import { AuthService } from '../services/auth/auth.service';
import { TweetRequest } from '../models/request/tweet-request.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit{
  currentContent: string = 'tweets';
  modalOpen: boolean = false;
  currentUser: User | null;
  users:User[] = []
  tweets : Tweets[]=[]
  submitted: boolean = false;
  productDialog: boolean = false;
 
  visible: boolean = false;


  public tweetRequest: TweetRequest = <TweetRequest>{};

  constructor(
    private readonly apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  )
    {
    
    
    this.currentUser = null;
  }

  refresh() {
    this.apiService.getAllEntities(Tweets).subscribe((response) => {
      this.tweets = response.data;
    });
    console.log(this.tweets)

  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
}


  ngOnInit(): void {
    this.refresh();
  }

  onDelete(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarı ile silindi', life: 3000 });
      }
    });
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, Tweets);

  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  //güncelleme
  editDialog: boolean = false
  usersEdit: User | null = null;

  update(id: number, updatedUser: User) {
    return this.apiService.updateEntity(id, updatedUser, User);
  }

  onUpdate(id: number, updatedUser: User) {
    this.update(id, updatedUser).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'ilan güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('ilan güncellenirken bir hata oluştu:', error);
    });
  }

  hideDialog() {
    this.editDialog = false;
  }

  closeEditModal() {
    this.editDialog = false;
  }
 

  showDialog() {
    this.visible = true;
}

  onCreate(entity: TweetRequest) {
    this.addEntity<TweetRequest>(entity, 'Tweets').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.visible = false;
      }
    });
  }

  addEntity<TEntity>(entity: TEntity, entityType:  string) {
    return this.apiService.addEntity<TEntity>(entity, entityType);
  }
}
