import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseEditComponent} from './course-edit.component';

describe('CoursesEditComponent', () => {
  let component: CourseEditComponent;
  let fixture: ComponentFixture<CourseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
