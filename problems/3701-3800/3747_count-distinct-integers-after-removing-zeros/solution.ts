function countDistinct(n: number): number {
    // Count the zero-free integers in [1, n] directly from n's digits,
    // peeled off arithmetically. Every shorter length contributes a full
    // block of 9^k values; then a prefix matching n so far branches to any
    // smaller nonzero digit and completes freely. The walk stops at n's
    // first zero digit — nothing below can be zero-free once the prefix
    // carries one.
    const digits: number[] = [];
    for (let m = n; m > 0; m = Math.floor(m / 10)) digits.push(m % 10);
    let total = 0;
    let pow9 = 1;
    for (let k = 1; k < digits.length; k++) {
        pow9 *= 9;
        total += pow9;
    }
    let tight = true;
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] > 1) total += (digits[i] - 1) * pow9;
        if (digits[i] === 0) {
            tight = false;
            break;
        }
        pow9 = Math.floor(pow9 / 9);
    }
    if (tight) total += 1;
    return total;
}
