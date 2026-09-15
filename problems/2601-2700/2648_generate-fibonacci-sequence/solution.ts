// The largest yielded value is F(49) = 7778742049, below
// Number.MAX_SAFE_INTEGER = 2^53 - 1, and every earlier Fibonacci number
// is smaller — so plain Number arithmetic is exact across the whole
// constraint domain (0 <= callCount <= 50).
function* fibGenerator(): Generator<number> {
    // Yield the first two terms by definition, then slide a window: each
    // next value is the sum of the previous two.
    let a = 0;
    let b = 1;
    yield a;
    yield b;
    while (true) {
        const next = a + b;
        a = b;
        b = next;
        yield next;
    }
}

class Solution {
    run(fibCase: FibCase): void {
        fibCase.drive(fibGenerator);
    }
}
