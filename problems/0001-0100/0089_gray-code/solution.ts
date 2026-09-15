function grayCode(n: number): number[] {
    // The pinned order is its own recipe: element at index i is i ^ (i >> 1),
    // the standard reflected gray code. One loop, no post-processing.
    const code: number[] = [];
    for (let i = 0; i < 1 << n; ++i) {
        code.push(i ^ (i >> 1));
    }
    return code;
}
