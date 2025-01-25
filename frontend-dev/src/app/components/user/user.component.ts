import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserDTO, UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  displayedCols: string[] = ['lastName', 'firstName', 'userEmail', 'role'];
  dataSource = new MatTableDataSource<UserDTO>();

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.dataSource.data = data),
      error: (err) => console.error('Error fetching data!', err),
    });
  }
}
