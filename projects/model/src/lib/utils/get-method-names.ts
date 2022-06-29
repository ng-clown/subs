export function getMethodNames(obj: any): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
}
