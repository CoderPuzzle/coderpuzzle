function circularPermutation(n: number, start: number): number[] {
    // Reflected gray code g(i) = i ^ (i >> 1); XOR-ing every entry by start
    // preserves the one-bit-step property and lands p[0] = start.
    const size = 1 << n;
    const out: number[] = new Array(size);
    for (let i = 0; i < size; ++i) out[i] = start ^ (i ^ (i >> 1));
    return out;
}
