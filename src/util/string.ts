export function uint8ArrayToHex(uint8Array: Uint8Array): string {
    return Array.from(uint8Array, byte => ('0' + byte.toString(16)).slice(-2)).join('');
}

export function randomHex(num: number): string {
    const bytes = new Uint8Array(num);
    crypto.getRandomValues(bytes)
    return uint8ArrayToHex(bytes)
}