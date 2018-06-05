import { Exclude, Expose } from 'class-transformer';

import {
  IsInt,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

@Exclude()
export class CreateClient {
  @Expose()
  @IsNotEmpty()
  public firstName!: string;

  @Expose()
  @IsNotEmpty()
  public lastName!: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @Expose()
  @IsInt()
  @IsOptional()
  public coachId?: number;

  @Expose()
  @IsInt()
  @IsOptional()
  public nutritionistId?: number;

}
