import { Component, Output, Renderer2, ViewChild, HostListener, HostBinding, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
})

export class LocationAutocompleteComponent {
  @ViewChild('locationInput') locationInput;
  @HostBinding('class') classes = 'location-autocomplete';
  @Output() sendLocation = new EventEmitter();
  items: string[];
  selectedIndex = -1;
  wasSelected = false;
  suggestionOpen = false;
  selectedLocation = '';
  constructor(
    private renderer: Renderer2,
    private http: HttpClient) {
  }

  getLocationSuggest = (e): void => {

    if (this.selectedLocation === e.target.value || e.key === 'Escape') {
      return;
    }

    const searchQuery =  e.target.value.replace(' ', '%20');
    this.wasSelected = false;
    this.selectedLocation = '';

    if (!searchQuery) {
      this.suggestionOpen = false;
      return;
    }

    const place = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=`;
    const token = 'pk.eyJ1IjoiamVzdGVybWF4cmtvIiwiYSI6ImNqa2xoYnJhYTAwajMzcXFydjRkZGYyYXkifQ.GoGujrYQnsESbqfkfA9htg';
    const options = '&autocomplete=true&language=en';
    const query = `${place}${token}${options}`;

    this.http.get(query).subscribe(
      (res: any) => {
        if (res.features) {
          this.items = res.features.map(item => item.place_name_en);
          this.suggestionOpen = true;
        }
      },
    );
  }

  setActive = (e): void => {
    this.selectedIndex = Number(e.target.id);
    this.renderer.addClass(e.target, 'suggest-item--active');
  }

  setUnActive = (e): void => {
    this.selectedIndex = -1;
    this.renderer.removeClass(e.target, 'suggest-item--active');
  }
  selectLocation = (e?): void => {
    if (e) { e.stopPropagation(); }
    this.wasSelected = true;
    this.suggestionOpen = false;
    this.selectedLocation = this.items[this.selectedIndex];
    this.sendLocation.emit(this.selectedLocation);
  }

  navigateByArrows = (e): void => {
    let newIndex = -1;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        newIndex = this.selectedIndex + 1;
        this.selectedIndex = newIndex < 0 || newIndex > this.items.length - 1 ? this.selectedIndex : newIndex;
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIndex = this.selectedIndex - 1 ;
        this.selectedIndex = newIndex < 0 || newIndex > this.items.length - 1 ? this.selectedIndex : newIndex;
        break;
      case 'Enter':
        e.preventDefault();
        if (e.target.value) { this.selectLocation(); }
        break;
      case 'Escape':
        e.preventDefault();
        this.closeAutocomplte();
    }
  }

  clearInput = (): void => {
    this.locationInput.nativeElement.value = '';
    this.selectedLocation = '';
    this.wasSelected = false;
    this.sendLocation.emit(this.selectedLocation);
  }

  stopClosing = (e): void => {
    e.stopPropagation();
  }

  @HostListener('document:click', ['$event']) closeAutocomplte(): void {
    this.suggestionOpen = false;
    this.sendLocation.emit(this.selectedLocation);
  }

}
