import { AxiosResponse } from "axios";
import { Request } from "@common/request";
import {
  CreateCourseInput,
  CreateCourseResponse,
  DeleteCourseInput,
  DeleteCourseResponse,
  GetCoursesInput,
  GetCoursesResponse,
  UpdateCourseInput,
  UpdateCourseResponse,
} from "@ts/requests";
import { Course } from "@ts/types";

export const getCourses = () => Request.instance.get<GetCoursesInput, AxiosResponse<GetCoursesResponse>>("/courses");

export const createCourse = (course: Partial<Course>) =>
  Request.instance.post<CreateCourseInput, AxiosResponse<CreateCourseResponse>>(`/courses`, course);

export const updateCourse = (courseId: number, updateDate: Partial<Course>) =>
  Request.instance.put<UpdateCourseInput, AxiosResponse<UpdateCourseResponse>>(`/courses/${courseId}`, updateDate);

export const deleteCourse = (courseId: number) =>
  Request.instance.delete<DeleteCourseInput, AxiosResponse<DeleteCourseResponse>>(`/courses/${courseId}`);
