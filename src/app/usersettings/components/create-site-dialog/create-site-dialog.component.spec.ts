import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSiteDialogComponent } from './create-site-dialog.component';

describe('CreateSiteDialogComponent', () => {
  let component: CreateSiteDialogComponent;
  let fixture: ComponentFixture<CreateSiteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSiteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
