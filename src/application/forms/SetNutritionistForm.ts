import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

@Exclude()
export class SetNutritionistForm {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  public id!: number;
}
