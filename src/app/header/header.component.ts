import { Component, Output, OnInit, OnDestroy, EventEmitter, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() zipchange = new EventEmitter<string>();
  @Output() useTz = new EventEmitter<boolean>();
  @Input() title;

  zipCodeMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/];
  private subscriptios: Subscription[];
  private zipPublisher = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this.subscriptios = [
      this.zipPublisher
        .pipe(distinctUntilChanged(), debounceTime(1000))
        .subscribe(zipcode => this.zipchange.emit(zipcode))
    ];
  }

  ngOnDestroy() {
    this.subscriptios.forEach(subscription => subscription.unsubscribe());
  }

  onZipChange(zipcode) {
    if (zipcode.replace('_', '').length === 5) {
      this.zipPublisher.next(zipcode);
    } else {
      this.zipPublisher.next(null);
    }
  }

  onTimeTypeChange(useTz) {
    this.useTz.emit(useTz);
  }
}
