import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartstestComponent } from './echartstest.component';

describe('EchartstestComponent', () => {
  let component: EchartstestComponent;
  let fixture: ComponentFixture<EchartstestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartstestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EchartstestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
