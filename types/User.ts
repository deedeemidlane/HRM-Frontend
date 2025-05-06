export interface IUser {
  id: number
  fullName: string
  email: string
  position: string
  departmentName: string
  roles: IRole[]
}

export interface IRole {
  id: number
  name: "ROLE_ADMIN" | "ROLE_MANAGER" | "ROLE_USER"
}
