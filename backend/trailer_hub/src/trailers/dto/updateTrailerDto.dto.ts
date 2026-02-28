import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";

export class UpdateTrailerDto {
    @IsString()
    @IsOptional()
    titulo?: string;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsUrl()
    @IsOptional()
    img?: string;

    @IsUrl()
    @IsOptional()
    youtube?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    relacionados?: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    categoria?: string[];

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(18)
    @IsOptional()
    classificacao?: number;
}