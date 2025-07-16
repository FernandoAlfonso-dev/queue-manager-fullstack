export interface FindOrThrowInterface<T> {
    finder: () => Promise<T | null>
    message?: string
}