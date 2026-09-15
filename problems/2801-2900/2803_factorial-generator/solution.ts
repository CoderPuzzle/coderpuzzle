// n <= 18 keeps every yielded factorial a safe integer: the largest is
// 18! = 6402373705728000, below Number.MAX_SAFE_INTEGER = 2^53 - 1, and
// each prefix product on the way there is smaller still — so plain
// Number arithmetic is exact across the whole domain.
function* factorial(n: number): Generator<number> {
    let result = 1;
    // First yield is the seed: 0! is defined as 1 (and equals 1!), so
    // n = 0 still produces its single required value before the loop.
    yield result;
    for (let k = 2; k <= n; k++) {
        result *= k;
        yield result;
    }
}

class Solution {
    run(genCase: GenCase): void {
        genCase.drive(factorial);
    }
}
