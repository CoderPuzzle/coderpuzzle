function hasSameDigits(s: string): boolean {
    // Each operation is a local rule: replace every adjacent pair with its
    // sum mod 10, shrinking the digit list by one. With at most 100 digits
    // the whole reduction is at most ~5000 additions, so simulate it
    // directly and compare the two survivors.
    let d: number[] = [];
    for (const c of s) {
        d.push(c.charCodeAt(0) - 48);
    }
    while (d.length > 2) {
        const next: number[] = [];
        for (let i = 0; i + 1 < d.length; i++) {
            next.push((d[i] + d[i + 1]) % 10);
        }
        d = next;
    }
    return d[0] === d[1];
}
