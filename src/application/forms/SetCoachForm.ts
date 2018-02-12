import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

@Exclude()
export class SetCoachForm {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  public id!: number;
}
