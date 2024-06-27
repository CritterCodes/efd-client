import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RepairService } from '../repair.service';
import { Repair } from '../repair';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-repairs-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './new-repair.component.html',
  styleUrls: ['./new-repair.component.css'] // Note the correct plural form
})
export class NewRepairComponent implements OnInit {
  repairForm: FormGroup;
  users: User[] = [];
  filteredUsers$: Observable<User[]> = of([]);
  showDropdown: boolean = false;

  repair: Repair = {
    repairID: '',
    userID: '',
    description: '',
    picture: '',
    receivedDate: '',
    promiseDate: '',
    metalType: '',
    repairTasks: [],
    status: 'pending'
  };
  imagePreview: string | ArrayBuffer | null = '';

  constructor(private repairService: RepairService, private router: Router, private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
    this.repairForm = this.fb.group({
      userID: ['', Validators.required],
      description: ['', Validators.required],
      picture: [''],
      promiseDate: ['', Validators.required],
      metalType: ['', Validators.required],
      task: [''] // Standalone input for task
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.filteredUsers$ = this.repairForm.get('userID')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterUsers(value))
    );

    this.route.queryParams.subscribe(params => {
      const userID = params['userID'];
      if (userID) {
        this.repair.userID = userID;
        this.repairForm.patchValue({ userID });
      }
    });
  }

  filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user =>
      user.userID.toLowerCase().includes(filterValue) || `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(filterValue)
    );
  }

  addTask(): void {
    const task = this.repairForm.get('task')!.value;
    if (task) {
      this.repair.repairTasks.push(task);
      this.repairForm.patchValue({ task: '' }); // Clear the input after adding the task
    }
  }

  removeTask(index: number): void {
    this.repair.repairTasks.splice(index, 1);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.repair.picture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  createRepair(): void {
    if (this.repairForm.valid) {
      this.repair = {
        ...this.repair,
        userID: this.repairForm.get('userID')!.value,
        description: this.repairForm.get('description')!.value,
        promiseDate: this.repairForm.get('promiseDate')!.value,
        metalType: this.repairForm.get('metalType')!.value,
        repairTasks: this.repair.repairTasks,
        status: 'pending'
      };

      this.repairService.createRepair(this.repair)
        .subscribe({
          next: () => {
            console.log('Repair created successfully');
            this.router.navigate(['/dashboard/repairs']);
          },
          error: (error) => {
            console.error('There was an error creating the repair:', error);
          }
        });
    } else {
      console.error('Form is invalid');
    }
  }

  setUserID(userID: string): void {
    this.repair.userID = userID;
    this.repairForm.patchValue({ userID: userID });
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-list') && !target.closest('#userID')) {
      this.showDropdown = false;
    }
  }
}
