

export type Role = "PARENT" | "STUDENT" | "SECRETARY" | "TEACHER";

export type User = {
email: string,
firstName: string,
id:string,
lastName:string,
role: Role
};