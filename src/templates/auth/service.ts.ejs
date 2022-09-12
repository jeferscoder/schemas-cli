import { Handling } from '@utils/Handling';
import { authDto } from './auth.dto';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersRepository from '@modules/users/users.repository';
import { saveDTO } from '@modules/users/users.dto';
import * as usersService from '@modules/users/users.service';
export const signin = async (dto: authDto) => {
  const user = await usersRepository.findByEmail(dto.email);

  // verify email
  if (!(user || compareSync(dto.password, user.password)))
    return new Handling('Credentials incorrect', 401);

  const token = await sign(user.id);

  return {
    user: {
      ...user,
      password: undefined,
    },
    token,
  };
};

export const signup = async (dto: saveDTO) => {
  return await usersService.save(dto);
};

const sign = async (id: number | string) => {
  return jwt.sign({ sub: id }, process.env['JWT_SECRET'], {
    expiresIn: '84500s',
  });
};
