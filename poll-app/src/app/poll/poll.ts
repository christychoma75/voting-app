import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollService } from '../poll';
import { Poll } from '../poll.models';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.html',
  styleUrl: './poll.css',
})
export class PollComponent implements OnInit {
  polls: Poll[] = [];

  constructor(private pollService: PollService) {
    
  }

  ngOnInit() {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (err) => {
        console.error("Error loading polls: ", err);
      }
    });
  }
}
