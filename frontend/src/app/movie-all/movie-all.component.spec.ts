import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAllComponent } from './movie-all.component';

describe('MovieAllComponent', () => {
  let component: MovieAllComponent;
  let fixture: ComponentFixture<MovieAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
