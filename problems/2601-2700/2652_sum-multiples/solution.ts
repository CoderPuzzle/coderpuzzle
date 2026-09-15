function sumOfMultiples(n: number): number {
    // Straight scan over [1, n]: anything divisible by 3, 5, or 7
    // contributes once — numbers divisible by two of them (say 15) or
    // all three (105) still count a single time, which the `||` handles
    // without any inclusion-exclusion bookkeeping. The answer stays far
    // below Number's exact range (< 10^6 for n <= 10^3).
    let total = 0;
    for (let value = 1; value <= n; value++) {
        if (value % 3 === 0 || value % 5 === 0 || value % 7 === 0) {
            total += value;
        }
    }
    return total;
}
