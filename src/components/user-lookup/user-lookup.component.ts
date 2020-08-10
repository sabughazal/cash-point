import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-user-lookup',
  templateUrl: './user-lookup.component.html',
  styleUrls: ['./user-lookup.component.css']
})
export class UserLookupComponent implements OnInit {

  @Output() onUserSelect: EventEmitter<any> = new EventEmitter();
  @Input() deliveryOnly: boolean;
  currentUsers: Array<any> = [];

  constructor(private users: UserService) { }

  ngOnInit() {
    this.loadUsers(this.deliveryOnly);
  }

  onUserClick(user) {
    this.onUserSelect.emit(user);
  }

  
  /** PRIVATE METHODS */

  private loadUsers(deliveryOnly = null) {
    var options = {};
    if (deliveryOnly !== null) {
      options['isDelivery'] = true;
    }
    var promise = this.users.getUsers(options).then(response => {
      if (response.data) {
        this.currentUsers = response.data;
      }
    });
    return promise;
  }

}
