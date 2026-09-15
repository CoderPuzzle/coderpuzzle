function getProbability(balls: number[]): number {
    const total = balls.reduce((sum, count) => sum + count, 0);
    const half = total / 2;
    const denominator = binomial(total, half);
    const numerator = walk(balls, 0, half, 0, 0);
    return numerator / denominator;
}

// Sum of per-color binomial products over the completions whose two
// boxes end with equal distinct-color counts.
function walk(balls: number[], index: number, remaining: number, distinct1: number, distinct2: number): number {
    if (index === balls.length) {
        return remaining === 0 && distinct1 === distinct2 ? 1 : 0;
    }
    const count = balls[index];
    let ways = 0;
    const limit = Math.min(count, remaining);
    for (let x = 0; x <= limit; x++) {
        ways +=
            binomial(count, x) *
            walk(balls, index + 1, remaining - x, distinct1 + (x > 0 ? 1 : 0), distinct2 + (x < count ? 1 : 0));
    }
    return ways;
}

function binomial(n: number, k: number): number {
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result = (result * (n - k + i)) / i;
    }
    return result;
}
