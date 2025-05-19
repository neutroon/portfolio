import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import {
  SkillService,
  Skill,
  SkillCategory,
} from '../../services/skill.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ProgressSpinnerModule,
    MessageModule,
    ButtonModule,
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit, OnDestroy {
  skillCategories: SkillCategory[] = [];
  loading = true;
  error: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    this.loadSkills();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadSkills() {
    const sub = this.skillService.getSkillsByCategory().subscribe({
      next: (categories) => {
        this.skillCategories = categories;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load skills. Please try again later.';
        this.loading = false;
      },
    });
    this.subscriptions.push(sub);
  }

  getLevelClass(level: number): string {
    return `level-${level}`;
  }

  getLevelText(level: number): string {
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];
    return levels[level - 1] || 'Unknown';
  }

  retryLoading() {
    this.error = null;
    this.loadSkills();
  }
}
