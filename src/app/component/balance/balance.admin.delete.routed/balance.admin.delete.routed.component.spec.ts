/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Balance.admin.delete.routedComponent } from './balance.admin.delete.routed.component';

describe('Balance.admin.delete.routedComponent', () => {
  let component: Balance.admin.delete.routedComponent;
  let fixture: ComponentFixture<Balance.admin.delete.routedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Balance.admin.delete.routedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Balance.admin.delete.routedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
