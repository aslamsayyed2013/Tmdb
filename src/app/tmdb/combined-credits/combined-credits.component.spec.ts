import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedCreditsComponent } from './combined-credits.component';

describe('CombinedCreditsComponent', () => {
  let component: CombinedCreditsComponent;
  let fixture: ComponentFixture<CombinedCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinedCreditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
