import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository";

interface User {
    name: string;
    class: string;
}

async function createUser(user: User) {
    
    const result = await userRepository.createUser(user);
    
    const token = jwt.sign(
    {
      user: result.id,
    },
    process.env.JWT_SECRET
    );
    
    return { token };
}

export { createUser };