import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    TreeModule,
    ButtonModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

  files!: TreeNode[];


  ngOnInit() {
    this.files = [
      {
        key: '0',
        label: 'Technical Skills',
        data: 'Technical Skills Folder',
        icon: 'pi pi-fw pi-inbox',
        children: [
            {
                key: '0-0',
                label: 'languages',
                data: 'languages Folder',
                icon: 'pi pi-fw pi-cog',
                children: [
                  { key: '0-0-0', label: 'JavaScript', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                  { key: '0-0-1', label: 'TypeScript', icon: 'pi pi-fw pi-file', data: 'Resume Document' },
                  { key: '0-0-2', label: 'PHP', icon: 'pi pi-fw pi-file', data: 'Resume Document' },
                  { key: '0-0-3', label: 'C#', icon: 'pi pi-fw pi-file', data: 'Resume Document' },
                  { key: '0-0-4', label: 'C++', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
                ]
            },
            {
                key: '0-1',
                label: 'Front-End',
                data: 'Front-End Folder',
                icon: 'pi pi-fw pi-home',
                children: [
                  { key: '0-1-0', label: 'HTML', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-1', label: 'CSS', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-2', label: 'Bootstrap', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-3', label: 'JavaScript', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-4', label: 'JQuery', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-5', label: 'SCSS', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-6', label: 'TypeScript', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-7', label: 'Angular', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-8', label: 'primeng', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-9', label: 'primeFlex', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-10', label: 'ngx-translate', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-1-11', label: 'lazy looding', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                ]
            },
            {
                key: '0-2',
                label: 'Back-End',
                data: 'Back-End Folder',
                icon: 'pi pi-fw pi-home',
                children: [
                  { key: '0-2-0', label: 'Basics of PHP', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-2-1', label: 'SQL', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                  { key: '0-2-2', label: 'MYSQL', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },
                ]
            }
        ]
    },
      {
        key: '1',
        label: 'Soft Skills',
        data: 'Soft Skills Folder',
        icon: 'pi pi-fw pi-inbox',
        children: [
            {
                key: '1-0',
                label: 'Excellent communication',
                data: 'Work Folder',
                icon: 'pi pi-fw pi-cog',
            },
            {
                key: '1-1',
                label: 'Ability to multitask',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
            },
            {
                key: '1-2',
                label: 'Problem Solving',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
            },
            {
                key: '1-3',
                label: 'Attention to detail',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
            },
            {
                key: '1-4',
                label: 'Creativity',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
            },
            {
                key: '1-5',
                label: 'Positive attitude',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
            }
        ]
    },
      {
        key: '2',
        label: 'General Knowledge',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-inbox',
        children: [
            {
                key: '2-0',
                label: 'Git',
                data: 'General Knowledge Folder',
                icon: 'pi pi-fw pi-cog',
            },
            {
                key: '2-1',
                label: 'GitHub',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
            },
            {
                key: '2-2',
                label: 'OOP',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
            },
            {
                key: '2-3',
                label: 'Data Structure',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
            },
            {
                key: '2-4',
                label: 'Agile methodology',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
            },
        ]
    }
    ]
}

expandAll() {
    this.files.forEach((node) => {
        this.expandRecursive(node, true);
    });
}

collapseAll() {
    this.files.forEach((node) => {
        this.expandRecursive(node, false);
    });
}

private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
        node.children.forEach((childNode) => {
            this.expandRecursive(childNode, isExpand);
        });
    }
}









}
