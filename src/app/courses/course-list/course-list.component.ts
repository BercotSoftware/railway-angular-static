import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesService, GolfCourse} from '@golf-api'

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  golfCourses: GolfCourse[] = []

  constructor(private golfCourseService: CoursesService) {

  }

  ngOnInit(): void {
    this.loadGolfCourses();
  }

  loadGolfCourses(): void {
    this.golfCourseService.getGolfCourses()
      .subscribe(courses => {
        console.log('Received courses:', JSON.stringify(courses))
        this.golfCourses = courses;
      });
  }
}
