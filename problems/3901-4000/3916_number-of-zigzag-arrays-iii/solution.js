/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var zigZagArrays = function (n, l, r) {
    const MOD = 1_000_000_007;
    const points = n + 1;
    const values = [0];
    for (let width = 1; width <= points; ++width) {
        if (width === 1) {
            values.push(0);
            continue;
        }
        let up = Array.from({ length: width }, (_, value) => value);
        let down = Array.from({ length: width }, (_, value) => width - 1 - value);
        for (let length = 3; length <= n; ++length) {
            const nextUp = new Array(width).fill(0);
            let running = 0;
            for (let value = 0; value < width; ++value) {
                nextUp[value] = running;
                running = (running + down[value]) % MOD;
            }
            const nextDown = new Array(width).fill(0);
            running = 0;
            for (let value = width - 1; value >= 0; --value) {
                nextDown[value] = running;
                running = (running + up[value]) % MOD;
            }
            up = nextUp;
            down = nextDown;
        }
        values.push([...up, ...down].reduce((sum, value) => (sum + value) % MOD, 0));
    }

    const width = r - l + 1;
    if (width <= points) return values[width];
    const mod = 1_000_000_007n;
    const power = (base, exponent) => {
        let result = 1n;
        while (exponent > 0n) {
            if (exponent & 1n) result = (result * base) % mod;
            base = (base * base) % mod;
            exponent >>= 1n;
        }
        return result;
    };
    const x = BigInt(width);
    const factorial = new Array(points + 1).fill(1n);
    for (let value = 1; value <= points; ++value) factorial[value] = (factorial[value - 1] * BigInt(value)) % mod;
    const inverseFactorial = new Array(points + 1).fill(1n);
    inverseFactorial[points] = power(factorial[points], mod - 2n);
    for (let value = points; value > 0; --value)
        inverseFactorial[value - 1] = (inverseFactorial[value] * BigInt(value)) % mod;
    const prefix = new Array(points + 2).fill(1n);
    const suffix = new Array(points + 2).fill(1n);
    for (let value = 1; value <= points; ++value) prefix[value] = (prefix[value - 1] * (x - BigInt(value))) % mod;
    for (let value = points; value > 0; --value) suffix[value] = (suffix[value + 1] * (x - BigInt(value))) % mod;
    let answer = 0n;
    for (let value = 1; value <= points; ++value) {
        let term = (BigInt(values[value]) * prefix[value - 1]) % mod;
        term = (term * suffix[value + 1]) % mod;
        term = (term * inverseFactorial[value - 1]) % mod;
        term = (term * inverseFactorial[points - value]) % mod;
        answer = (points - value) % 2 === 0 ? answer + term : answer - term;
    }
    return Number(((answer % mod) + mod) % mod);
};
