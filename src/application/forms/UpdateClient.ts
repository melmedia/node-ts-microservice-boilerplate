import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsEmail, IsIn, IsOptional } from 'class-validator';

@Exclude()
export class UpdateClient {
  @Expose()
  public firstName?: string;

  @Expose()
  public lastName?: string;

  @Expose()
  @IsIn(['f', 'm'])
  @IsOptional()
  public gender?: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  public birthDate?: Date;

  @Expose()
  @IsEmail()
  @IsOptional()
  public email?: string;

}
