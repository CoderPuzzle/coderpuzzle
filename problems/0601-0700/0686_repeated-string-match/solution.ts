function repeatedStringMatch(a: string, b: string): number {
    const n = a.length;
    const m = b.length;
    // q = ceil(m/n) is the least count whose text is even as long as b, and
    // no occurrence needs more than q + 1: a repeated forever has period n,
    // so any occurrence of b slides into the first q + 1 copies.
    const q = Math.ceil(m / n);
    let repeated = a.repeat(q);
    if (repeated.includes(b)) return q;
    repeated += a;
    if (repeated.includes(b)) return q + 1;
    return -1;
}
