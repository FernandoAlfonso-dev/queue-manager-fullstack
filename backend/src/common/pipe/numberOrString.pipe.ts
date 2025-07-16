import { Injectable, PipeTransform, } from "@nestjs/common";

@Injectable()
export class NumberOrStringPipe implements PipeTransform {
    transform(value: string): string | number {
        const num = Number(value);

        if (!isNaN(num) && Number.isInteger(num)) return num;

        return value;
    }
}