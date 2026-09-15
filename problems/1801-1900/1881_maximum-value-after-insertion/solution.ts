function maxValue(n: string, x: number): string {
    // Positive: insert before the first digit < x (else append).
    // Negative: insert before the first digit > x (else append).
    const d = String(x);
    const neg = n[0] === "-";
    for (let i = neg ? 1 : 0; i < n.length; i++) {
        const better = neg ? Number(n[i]) > x : Number(n[i]) < x;
        if (better) {
            return n.slice(0, i) + d + n.slice(i);
        }
    }
    return n + d;
}
