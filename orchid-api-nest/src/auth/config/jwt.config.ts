import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";




export default registerAs<JwtModuleOptions>('jwt', () => ({

  secret: process.env.JWT_SECRET,
   signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 30 }
}))


// {
//   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY5NjM2NDg0LCJleHAiOjE3Njk2MzY1MTR9._CN4xSOol7MiHzbTMP5dLy4q3RiWePj2z17VNwuyXa4",
//   "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY5NjM2NDg0LCJleHAiOjE3NzAyNDEyODR9.7qNXnoFAXMa8tDvO5Au0KneecoVSmRmbf6Ns9nN2elA"
// }