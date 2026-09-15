function countOfPairs(n: number, x: number, y: number): number[] {
    const result = new Array<number>(n).fill(0);
    for (let k = 1; k <= n; k++) {
        // Baseline without the extra street: chain distance k carries
        // exactly 2 * (n - k) ordered pairs.
        result[k - 1] = 2 * (n - k);
    }
    if (x === y) {
        // A self-loop shortens nothing, so the chain distances stand.
        return result;
    }
    if (x > y) {
        [x, y] = [y, x];
    }
    const span = y - x;

    // Difference arrays over distance buckets, holding the improving
    // unordered pairs; they are prefixed into exact per-bucket counts.
    const departures = new Array<number>(n + 2).fill(0);
    const arrivals = new Array<number>(n + 2).fill(0);
    const addRange = (diff: number[], low: number, high: number): void => {
        // Range update in difference form, skipped when empty.
        if (low <= high) {
            diff[low]++;
            diff[high + 1]--;
        }
    };

    // Straddling pairs a < x < y < b: the trip through the shortcut,
    // (x - a) + 1 + (b - y) = (b - a) - span + 1, wins whenever
    // span > 1, moving each pair span - 1 buckets down.
    if (span >= 2) {
        for (let a = 1; a < x; a++) {
            addRange(departures, y + 1 - a, n - a);
            addRange(arrivals, y + 2 - a - span, n + 1 - a - span);
        }
    }

    // A house left of x with a partner in the shortcut's right half:
    // the trip (x - a) + 1 + (y - b) = x + y + 1 - a - b wins exactly
    // when 2 * b > x + y + 1.
    const rightStart = Math.floor((x + y) / 2) + 1;
    for (let a = 1; a < x; a++) {
        addRange(departures, rightStart - a, y - a);
        addRange(arrivals, x + 1 - a, x + y + 1 - a - rightStart);
    }

    // A partner right of y with an in-shortcut house in its left half:
    // the trip (a - x) + 1 + (b - y) = a + b - x - y + 1 wins exactly
    // when 2 * a < x + y - 1.
    const leftEnd = Math.floor((x + y - 2) / 2);
    if (leftEnd >= x) {
        for (let b = y + 1; b <= n; b++) {
            addRange(departures, b - leftEnd, b - x);
            addRange(arrivals, b - y + 1, b + leftEnd - x - y + 1);
        }
    }

    // Prefix the difference encodings into exact per-bucket counts.
    const departed = new Array<number>(n + 2).fill(0);
    const arrived = new Array<number>(n + 2).fill(0);
    for (let k = 1; k <= n + 1; k++) {
        departed[k] = departed[k - 1] + departures[k];
        arrived[k] = arrived[k - 1] + arrivals[k];
    }

    // Both endpoints inside the shortcut segment: the span + 1 houses
    // give gap g exactly span + 1 - g pairs, landing at span + 1 - g.
    // These weights are exact, not differences, so they merge after
    // prefixing rather than into the raw arrays.
    for (let gap = Math.floor(span / 2) + 1; gap <= span; gap++) {
        departed[gap] += span + 1 - gap;
        arrived[span + 1 - gap] += span + 1 - gap;
    }

    // Every improving unordered pair leaves its chain bucket and lands
    // in its shortened bucket; ordered pairs double both moves.
    for (let k = 1; k <= n; k++) {
        result[k - 1] += 2 * (arrived[k] - departed[k]);
    }
    return result;
}
