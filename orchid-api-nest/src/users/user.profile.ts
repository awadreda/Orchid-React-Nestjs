import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { User } from '@prisma/client';


@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, User, UserDto,
        forMember(dest => dest.fullName, mapFrom(src => src.name)), // example transform
      );
    };
  }
}
