import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToSiteDialogComponent } from './connect-to-site-dialog.component';

describe('ConnectToSiteDialogComponent', () => {
  let component: ConnectToSiteDialogComponent;
  let fixture: ComponentFixture<ConnectToSiteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectToSiteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectToSiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
