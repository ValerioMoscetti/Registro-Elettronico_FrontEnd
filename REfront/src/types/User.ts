

export type Role = "PARENT" | "STUDENT" | "SECRETARY" | "TEACHER";

export type User = {
    id: string,
    firstName: string,
    lastName:string,
    role: Role
};