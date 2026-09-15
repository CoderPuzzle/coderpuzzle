function isHappy(n: number): boolean {
    // Sum of the squares of the digits, one digit per iteration.
    const step = (m: number): number => {
        let total = 0;
        while (m !== 0) {
            const digit = m % 10;
            total += digit * digit;
            m = Math.floor(m / 10);
        }
        return total;
    };
    // The digit-square map is deterministic, so iterating it must reach 1
    // (a fixed point) or cycle; a revisit means it will never reach 1.
    const seen = new Set<number>();
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = step(n);
    }
    return n === 1;
}
