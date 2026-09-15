function findMinFibonacciNumbers(k: number): number {
    const fibs: number[] = [1, 1];
    while (fibs[fibs.length - 1] + fibs[fibs.length - 2] <= k) {
        fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    }
    // Zeckendorf: greedily taking the largest F <= k never lands on two
    // consecutive Fibonacci numbers, so this builds the unique minimal
    // (non-consecutive) representation term by term
    let count = 0;
    let remaining = k;
    let index = fibs.length - 1;
    while (remaining > 0) {
        while (fibs[index] > remaining) {
            index--;
        }
        remaining -= fibs[index];
        count++;
    }
    return count;
}
