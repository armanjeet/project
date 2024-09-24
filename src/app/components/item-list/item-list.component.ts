import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  sortDirection: string = 'asc';
  errorMessage: string = '';
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: data => {
        this.items = data;
        this.filteredItems = [...this.items];
      },
      error: err => this.errorMessage = err
    });
  }

  filterItems(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  sortItems(): void {
    this.filteredItems.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
