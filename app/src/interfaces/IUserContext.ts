import { IUser } from "./IUser"

export interface IUserContext {
    user: IUser | null,
    login: (userData: IUser, remeberMe: boolean) => void,
    logout: () => void
}