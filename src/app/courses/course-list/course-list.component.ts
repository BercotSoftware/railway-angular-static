import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesService, CourseSummary} from '@golf-api'
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  $golfCourses = new BehaviorSubject<CourseSummary[]>([])

  constructor(private golfCourseService: CoursesService) {
  }

  ngOnInit(): void {
    this.loadGolfCourses();
  }

  loadGolfCourses(): void {
    this.golfCourseService.findAllCourses()
      .subscribe( {
        next : (result) => {
          // console.log('Received courses:', JSON.stringify(courses))
          this.$golfCourses.next(result.items || []);
        },
        error: (err) => {
          console.log('Error loading courses')
        },
        complete: () => {
        }
      });
  }

}
