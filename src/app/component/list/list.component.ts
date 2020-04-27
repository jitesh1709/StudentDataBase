import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  searchValues: '';
  filteredUsers: any;
  private users: User[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.readUsers();
  }
  newUser(event: any) {
    event.preventDefault();
    this.userService.setter(new User());
    this.router.navigate(['/createUpdate']);
  }
  onKey(event: any) { // without type info
    this.searchValues = event.target.value;
    console.log(this.searchValues,'inputBox'); 
    this.filteredUsers = this.users.filter(user => {
      user.username
      .toLowerCase()
      .includes(this.searchValues
      .toLowerCase())
    });
    console.log(this.filteredUsers);
    
  }
  readUsers() {
    this.userService.readUsers().subscribe(
      data => {
        console.log(data);
        this.users = data['msg'];
      },
      error => {
        console.log(error);
      }
    );
  }
  doUpdate(user) {
    this.userService.setter(user);
    this.router.navigate(['/createUpdate']);
  }
  doDelete(user) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.userService.deleteUser(user._id).subscribe(
        data => {
          this.users.splice(this.users.indexOf(user), 1);
        },
        error => {
          console.log(error);
        });
    }
  }
}
