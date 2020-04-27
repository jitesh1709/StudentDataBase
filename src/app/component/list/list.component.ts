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
  searchedField: '';
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

  onKey(event: any) {
    this.searchedField = event.target.value;
    this.filteredUsers = this.users.filter(user => {
      return user.username.toLowerCase().includes(this.searchedField.toLowerCase());
    });
  }

  readUsers() {
    this.userService.readUsers().subscribe(
      data => {
        console.log(data);
        this.users = data['msg'];
        this.filteredUsers = this.users;
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
