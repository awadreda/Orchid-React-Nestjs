import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";




export default registerAs<JwtModuleOptions>('jwt', () => ({

  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 86400  }
}))