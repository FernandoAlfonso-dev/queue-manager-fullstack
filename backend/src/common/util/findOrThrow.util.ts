import { NotFoundException } from "@nestjs/common";
import { FindOrThrowInterface } from "./interface/findOrThrow.interface";

/**
 * Utility function to find an item using a finder function and throw an exception if not found.
 * @param finder - A function that returns a promise resolving to the item or null.
 * @param message - Optional custom message for the NotFoundException.
 * @returns The found item or null if not found.
 * @throws NotFoundException if the item is not found.
 */
export async function findOrThrow<T>({
    finder,
    message

}: FindOrThrowInterface<T>): Promise<T | null> {

    const result = await finder()
    const message_default = 'Not found'

    if (!result) {
        throw new NotFoundException(message || message_default);
    }
    return result || null;
}