import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeduserComponent } from './addeduser.component';

describe('AddeduserComponent', () => {
  let component: AddeduserComponent;
  let fixture: ComponentFixture<AddeduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
