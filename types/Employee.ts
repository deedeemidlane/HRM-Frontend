export interface IEmployee {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
  gender: string
  dateOfBirth: string
  idNumber: string
  position: string
  hireDate: string
  contractType: string
  department: {
    id: number
    departmentCode: string
    departmentName: string
  }
  active: boolean
}
