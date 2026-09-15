impl Solution {
    pub fn count_of_pairs(n: i32, x: i32, y: i32) -> Vec<i32> {
        let n = n as usize;
        let (mut x, mut y) = (x as usize, y as usize);
        let mut result = vec![0i32; n];
        for k in 1..=n {
            // Baseline without the extra street: chain distance k carries
            // exactly 2 * (n - k) ordered pairs.
            result[k - 1] = (2 * (n - k)) as i32;
        }
        if x == y {
            // A self-loop shortens nothing, so the chain distances stand.
            return result;
        }
        if x > y {
            std::mem::swap(&mut x, &mut y);
        }
        let span = y - x;

        // Difference arrays over distance buckets, holding the improving
        // unordered pairs; they are prefixed into exact per-bucket counts.
        let mut departures = vec![0i64; n + 2];
        let mut arrivals = vec![0i64; n + 2];

        // Straddling pairs a < x < y < b: the trip through the shortcut,
        // (x - a) + 1 + (b - y) = (b - a) - span + 1, wins whenever
        // span > 1, moving each pair span - 1 buckets down.
        if span >= 2 {
            for a in 1..x {
                departures[y + 1 - a] += 1;
                departures[n - a + 1] -= 1;
                arrivals[y + 2 - a - span] += 1;
                arrivals[n + 2 - a - span] -= 1;
            }
        }

        // A house left of x with a partner in the shortcut's right half:
        // the trip (x - a) + 1 + (y - b) = x + y + 1 - a - b wins exactly
        // when 2 * b > x + y + 1.
        let right_start = (x + y) / 2 + 1;
        for a in 1..x {
            departures[right_start - a] += 1;
            departures[y - a + 1] -= 1;
            arrivals[x + 1 - a] += 1;
            arrivals[x + y + 1 - a - right_start + 1] -= 1;
        }

        // A partner right of y with an in-shortcut house in its left half:
        // the trip (a - x) + 1 + (b - y) = a + b - x - y + 1 wins exactly
        // when 2 * a < x + y - 1.
        let left_end = (x + y - 2) / 2;
        if left_end >= x {
            for b in y + 1..=n {
                departures[b - left_end] += 1;
                departures[b - x + 1] -= 1;
                arrivals[b - y + 1] += 1;
                arrivals[b + left_end - x - y + 2] -= 1;
            }
        }

        // Prefix the difference encodings into exact per-bucket counts.
        let mut departed = vec![0i64; n + 2];
        let mut arrived = vec![0i64; n + 2];
        for k in 1..=n + 1 {
            departed[k] = departed[k - 1] + departures[k];
            arrived[k] = arrived[k - 1] + arrivals[k];
        }

        // Both endpoints inside the shortcut segment: the span + 1 houses
        // give gap g exactly span + 1 - g pairs, landing at span + 1 - g.
        // These weights are exact, not differences, so they merge after
        // prefixing rather than into the raw arrays.
        for gap in span / 2 + 1..=span {
            departed[gap] += (span + 1 - gap) as i64;
            arrived[span + 1 - gap] += (span + 1 - gap) as i64;
        }

        // Every improving unordered pair leaves its chain bucket and lands
        // in its shortened bucket; ordered pairs double both moves.
        for k in 1..=n {
            result[k - 1] += (2 * (arrived[k] - departed[k])) as i32;
        }
        result
    }
}
