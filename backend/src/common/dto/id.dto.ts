import { IsInt, IsString } from "class-validator";

export class IdIntDto {

    @IsInt()
    id: number
}

export class IdStringDto {

    @IsString()
    id: string
}