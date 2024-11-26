/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Balance.admin.edit.routedComponent } from './balance.admin.edit.routed.component';

describe('Balance.admin.edit.routedComponent', () => {
  let component: Balance.admin.edit.routedComponent;
  let fixture: ComponentFixture<Balance.admin.edit.routedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Balance.admin.edit.routedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Balance.admin.edit.routedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
