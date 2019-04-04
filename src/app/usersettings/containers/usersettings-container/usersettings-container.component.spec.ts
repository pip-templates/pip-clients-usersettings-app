import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersettingsContainerComponent } from './usersettings-container.component';

describe('UsersettingsContainerComponent', () => {
  let component: UsersettingsContainerComponent;
  let fixture: ComponentFixture<UsersettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersettingsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
