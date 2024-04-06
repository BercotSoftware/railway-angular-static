import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesService, CourseSummary} from '@golf-api'
import {BehaviorSubject} from "rxjs";
import {Pageable} from "@utilities";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  $golfCourses = new BehaviorSubject<CourseSummary[]>([])
  paging : Pageable = { page: 0, size: 20, sort: "name" }

  constructor(private golfCourseService: CoursesService) {
  }

  ngOnInit(): void {
    this.loadGolfCourses();
  }

  loadGolfCourses(): void {
    this.golfCourseService.findAllCourses(this.paging.page, this.paging.size, this.paging.sort)
      .subscribe( {
        next : (result) => {
          // console.log('Received courses:', JSON.stringify(courses))
          this.$golfCourses.next(result.items || []);
        },
        error: (err) => {
          console.log('Error loading courses', err)
        },
        complete: () => {
        }
      });
  }

}
