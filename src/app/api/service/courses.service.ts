import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CourseSummary} from "../model/courseSummary";

@Injectable(
  {
    providedIn: 'root'
  })
export class CoursesService {

  private apiUrl = 'http://localhost:4000/courses'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Method to retrieve the list of golf courses
  getGolfCourses(): Observable<CourseSummary[]> {
    return this.http.get<CourseSummary[]>(this.apiUrl);
  }

}
