import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieLatestComponent } from './movie-latest.component';

describe('MovieLatestComponent', () => {
  let component: MovieLatestComponent;
  let fixture: ComponentFixture<MovieLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
