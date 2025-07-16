import { NotFoundException } from "@nestjs/common";
import { FindOrThrowInterface } from "./interface/findOrThrow.interface";

export async function findOrThrow<T>({
    finder,
    message

}: FindOrThrowInterface<T>): Promise<T> {

    const result = await finder()
    const message_default = 'Not found'

    if (!result) {
        throw new NotFoundException(message || message_default);
    }

    return result;
}