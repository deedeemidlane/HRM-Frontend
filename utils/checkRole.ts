import { IRole } from "@/types/User"

export function hasRole(targetRole: string, roles?: IRole[]) {
  if (!roles) return false
  return roles.findIndex((role: IRole) => role.name === targetRole) !== -1
}
