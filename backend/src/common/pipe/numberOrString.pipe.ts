import { Injectable, PipeTransform, } from "@nestjs/common";

/**
 * Pipe to transform a string input into a number if it is a valid integer.
 * If the input cannot be converted to a number, it returns the original string.
 */
@Injectable()
export class NumberOrStringPipe implements PipeTransform {
    transform(value: string): string | number {
        const num = Number(value);

        if (!isNaN(num) && Number.isInteger(num)) return num;

        return value;
    }
}