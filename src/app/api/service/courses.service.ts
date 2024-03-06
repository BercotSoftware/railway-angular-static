import { Injectable } from '@angular/core';
import {GolfCourse} from "../model/course-model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CoursesService {

  private apiUrl = 'http://localhost:4000/courses'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Method to retrieve the list of golf courses
  getGolfCourses(): Observable<GolfCourse[]> {
    return this.http.get<GolfCourse[]>(this.apiUrl);
  }

}
