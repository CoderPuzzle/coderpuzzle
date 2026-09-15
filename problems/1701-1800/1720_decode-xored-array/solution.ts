// XOR is its own inverse: canceling arr[i] out of
// encoded[i] = arr[i] ^ arr[i + 1] leaves
// arr[i + 1] = encoded[i] ^ arr[i]. Seed with first and unroll
// the chain left to right — the running element is the only
// unknown in the next equation.
function decode(encoded: number[], first: number): number[] {
    const arr: number[] = [first];
    let current = first;
    for (const value of encoded) {
        current ^= value;
        arr.push(current);
    }
    return arr;
}
