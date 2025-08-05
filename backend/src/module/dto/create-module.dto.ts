import { IsOptional, IsString } from "class-validator";

export class CreateModuleDto {

    @IsString()
    @IsOptional()
    name?: string;

}
