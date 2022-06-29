export function flattenObject(obj: { [key: string]: any }) {
    return copy(obj);
}

function copy(obj: { [key: string]: any }) {
    if (obj && typeof obj === 'object') {
        let newObj: { [key: string]: any } = Array.isArray(obj) ? [] : {};
        let value;
        for (const key in obj) {
            value = obj[key];
            newObj[key] = (typeof value === "object") ? copy(value) : value;
        }
        return newObj;
    } else {
        return obj;
    }
}