import { User } from "./entity/User"

export const createInitialUser = () => {
    const user = new User()
    user.username = 'admin'
    user.password = 'admin'
    user.name = 'admin'
    user.address = 'Bandung'
    user.age = 25
    user.phoneNumber = '081234567890'
    return user
}