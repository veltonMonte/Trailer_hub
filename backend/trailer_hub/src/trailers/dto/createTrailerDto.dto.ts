import { Type } from "class-transformer";
import { IsArray, IsInt, IsString } from "class-validator";

export class CreateTrailerDto {
    @IsString()
    titulo: string;

    @IsString()
    descricao: string;

    @IsString()
    img: string;

    @IsString()
    youtube: string;

    @IsArray()
    @IsString({ each: true })
    relacionados: string[];

    @IsArray()
    @IsString({ each: true })
    categoria: string[];

    @Type(() => Number)
    @IsInt()
    classificacao: number;
}