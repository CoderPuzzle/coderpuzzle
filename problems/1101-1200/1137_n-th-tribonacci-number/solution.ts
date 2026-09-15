function tribonacci(n: number): number {
    if (n === 0) return 0;
    // Window of (T0, T1, T2); each step advances it by one term.
    let a = 0,
        b = 1,
        c = 1;
    for (let i = 0; i < n - 2; ++i) {
        const next = a + b + c;
        a = b;
        b = c;
        c = next;
    }
    return c;
}
