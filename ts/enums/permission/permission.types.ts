export enum PermissionKey {
  READ_USER_PROFILE_SPECIFIC_USERS = "READ_USER_PROFILE_SPECIFIC_USERS",
  READ_USER_PROFILE_ANY_USERS_SPECIFIC_COURSES = "READ_USER_PROFILE_ANY_USERS_SPECIFIC_COURSES",
  UPDATE_USER_PROFILE_SPECIFIC_USERS = "UPDATE_USER_PROFILE_SPECIFIC_USERS",
  DELETE_USER_PROFILE_SPECIFIC_USERS = "DELETE_USER_PROFILE_SPECIFIC_USERS",

  CREATE_HOMEWORK_SPECIFIC_COURSES = "CREATE_HOMEWORK_SPECIFIC_COURSES",
  READ_ASSIGNED_HOMEWORK_SPECIFIC_USERS = "READ_ASSIGNED_HOMEWORK_SPECIFIC_USERS",
  READ_CREATED_HOMEWORK_SPECIFIC_USERS = "READ_CREATED_HOMEWORK_SPECIFIC_USERS",
  UPDATE_HOMEWORK_SPECIFIC_COURSES = "UPDATE_HOMEWORK_SPECIFIC_COURSES",
  UPDATE_HOMEWORK_DONE_STATUS_SPECIFIC_USERS = "UPDATE_HOMEWORK_DONE_STATUS_SPECIFIC_USERS",
  DELETE_HOMEWORK_SPECIFIC_COURSES = "DELETE_HOMEWORK_SPECIFIC_COURSES",

  CREATE_COURSES = "CREATE_COURSES",
  READ_SPECIFIC_COURSES = "READ_SPECIFIC_COURSES",
  UPDATE_SPECIFIC_COURSES = "UPDATE_SPECIFIC_COURSES",
  UPDATE_SPECIFIC_COURSES_MEMBERS = "UPDATE_SPECIFIC_COURSES_MEMBERS",
  DELETE_SPECIFIC_COURSES = "DELETE_SPECIFIC_COURSES",
}

export enum PermissionTargetKey {
  OWN_ID = "OWN_ID",
  STUDY_COURSES_IDS = "STUDY_COURSES_IDS",
  TEACH_COURSES_IDS = "TEACH_COURSES_IDS",
}
