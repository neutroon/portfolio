import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
})
export class ProgressSpinnerComponent {}
