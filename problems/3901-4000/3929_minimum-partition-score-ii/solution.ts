function minPartitionScore(nums: number[], k: number): number {
    let total = 0n;
    const prefix = nums.map((value) => (total += BigInt(value)));
    const floorDiv = (value: bigint, divisor: bigint): bigint => {
        let quotient = value / divisor;
        if (value < 0n && value % divisor !== 0n) quotient--;
        return quotient;
    };
    const ceilDiv = (value: bigint, divisor: bigint): bigint => {
        let quotient = value / divisor;
        if (value > 0n && value % divisor !== 0n) quotient++;
        return quotient;
    };
    type Line = { slope: bigint; intercept: bigint; count: number; start: bigint };
    const run = (penalty: bigint): [bigint, number] => {
        const hull: Line[] = [{ slope: 0n, intercept: 0n, count: 0, start: -(1n << 100n) }];
        let head = 0;
        let cost = 0n;
        let count = 0;
        for (const x of prefix) {
            while (head + 1 < hull.length && hull[head + 1].start <= x) head++;
            const best = hull[head];
            cost = x * x + penalty + best.slope * x + best.intercept;
            count = best.count + 1;
            const line: Line = { slope: -2n * x, intercept: cost + x * x, count, start: -(1n << 100n) };
            while (hull.length > 0) {
                const old = hull[hull.length - 1];
                const difference = line.intercept - old.intercept;
                const denominator = old.slope - line.slope;
                line.start =
                    count > old.count ? ceilDiv(difference, denominator) : floorDiv(difference, denominator) + 1n;
                if (line.start > old.start) break;
                hull.pop();
                head = Math.min(head, hull.length - 1);
            }
            if (hull.length === 0) {
                line.start = -(1n << 100n);
                head = 0;
            }
            hull.push(line);
        }
        return [cost, count];
    };
    let low = 0n;
    let high = total * total;
    while (low < high) {
        const middle = low + (high - low + 1n) / 2n;
        if (run(middle)[1] >= k) low = middle;
        else high = middle - 1n;
    }
    const relaxed = run(low)[0];
    return Number((relaxed - low * BigInt(k) + total) / 2n);
}
