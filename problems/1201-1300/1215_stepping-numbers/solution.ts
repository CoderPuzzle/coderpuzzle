function countSteppingNumbers(low: number, high: number): number[] {
    // Seed with every one-digit number, then extend by one digit: the
    // successor of a number ending in d is built from d-1 and d+1 only.
    // Values stay below 2^53, so JS numbers hold them exactly.
    const out: number[] = [];
    if (low <= 0 && 0 <= high) out.push(0);
    const queue: number[] = [];
    for (let seed = 1; seed <= 9; ++seed) queue.push(seed);
    for (let head = 0; head < queue.length; ++head) {
        const current = queue[head];
        if (current > high) continue;
        if (current >= low) out.push(current);
        const last = current % 10;
        for (const digit of [last - 1, last + 1]) {
            if (digit >= 0 && digit <= 9) queue.push(current * 10 + digit);
        }
    }
    return out;
}
