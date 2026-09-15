function getXORSum(arr1: number[], arr2: number[]): number {
    // AND distributes over XOR: (a&b)^(a&c) = a&(b^c). Folding that
    // repeatedly collapses all n*m pair terms to xor(arr1) & xor(arr2).
    let x = 0;
    for (const a of arr1) {
        x ^= a;
    }
    let y = 0;
    for (const b of arr2) {
        y ^= b;
    }
    return x & y;
}
