function commonFactors(a: number, b: number): number {
    // A common factor divides both numbers, hence their gcd; every
    // divisor of the gcd divides both. So the answer is the divisor
    // count of g = gcd(a, b): pair each d <= sqrt(g) dividing g with
    // its cofactor g / d (a perfect square pairs only once).
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    const g = a;
    let count = 0;
    for (let d = 1; d * d <= g; d++) {
        if (g % d === 0) {
            count += d * d === g ? 1 : 2;
        }
    }
    return count;
}
