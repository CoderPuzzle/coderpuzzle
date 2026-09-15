class Solution {

    public int[] countOfPairs(int n, int x, int y) {
        int[] result = new int[n];
        for (int k = 1; k <= n; k++) {
            // Baseline without the extra street: chain distance k carries
            // exactly 2 * (n - k) ordered pairs.
            result[k - 1] = 2 * (n - k);
        }
        if (x == y) {
            // A self-loop shortens nothing, so the chain distances stand.
            return result;
        }
        if (x > y) {
            int held = x;
            x = y;
            y = held;
        }
        int span = y - x;

        // Difference arrays over distance buckets, holding the improving
        // unordered pairs; they are prefixed into exact per-bucket counts.
        long[] departures = new long[n + 2];
        long[] arrivals = new long[n + 2];

        // Straddling pairs a < x < y < b: the trip through the shortcut,
        // (x - a) + 1 + (b - y) = (b - a) - span + 1, wins whenever
        // span > 1, moving each pair span - 1 buckets down.
        if (span >= 2) {
            for (int a = 1; a < x; a++) {
                addRange(departures, y + 1 - a, n - a);
                addRange(arrivals, y + 2 - a - span, n + 1 - a - span);
            }
        }

        // A house left of x with a partner in the shortcut's right half:
        // the trip (x - a) + 1 + (y - b) = x + y + 1 - a - b wins exactly
        // when 2 * b > x + y + 1.
        int rightStart = (x + y) / 2 + 1;
        for (int a = 1; a < x; a++) {
            addRange(departures, rightStart - a, y - a);
            addRange(arrivals, x + 1 - a, x + y + 1 - a - rightStart);
        }

        // A partner right of y with an in-shortcut house in its left half:
        // the trip (a - x) + 1 + (b - y) = a + b - x - y + 1 wins exactly
        // when 2 * a < x + y - 1.
        int leftEnd = (x + y - 2) / 2;
        if (leftEnd >= x) {
            for (int b = y + 1; b <= n; b++) {
                addRange(departures, b - leftEnd, b - x);
                addRange(arrivals, b - y + 1, b + leftEnd - x - y + 1);
            }
        }

        // Prefix the difference encodings into exact per-bucket counts.
        long[] departed = new long[n + 2];
        long[] arrived = new long[n + 2];
        for (int k = 1; k <= n + 1; k++) {
            departed[k] = departed[k - 1] + departures[k];
            arrived[k] = arrived[k - 1] + arrivals[k];
        }

        // Both endpoints inside the shortcut segment: the span + 1 houses
        // give gap g exactly span + 1 - g pairs, landing at span + 1 - g.
        // These weights are exact, not differences, so they merge after
        // prefixing rather than into the raw arrays.
        for (int gap = span / 2 + 1; gap <= span; gap++) {
            departed[gap] += span + 1 - gap;
            arrived[span + 1 - gap] += span + 1 - gap;
        }

        // Every improving unordered pair leaves its chain bucket and lands
        // in its shortened bucket; ordered pairs double both moves.
        for (int k = 1; k <= n; k++) {
            result[k - 1] += (int) (2 * (arrived[k] - departed[k]));
        }
        return result;
    }

    private static void addRange(long[] diff, int low, int high) {
        // Range update in difference form, skipped when empty.
        if (low <= high) {
            diff[low]++;
            diff[high + 1]--;
        }
    }
}
