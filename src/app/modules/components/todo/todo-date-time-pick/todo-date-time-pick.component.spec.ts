import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDateTimePickComponent } from './todo-date-time-pick.component';

describe('TodoDateTimePickComponent', () => {
  let component: TodoDateTimePickComponent;
  let fixture: ComponentFixture<TodoDateTimePickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoDateTimePickComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDateTimePickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
