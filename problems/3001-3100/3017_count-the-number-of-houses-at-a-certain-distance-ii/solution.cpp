class Solution {
  public:
    vector<int> countOfPairs(int n, int x, int y) {
        vector<int> result(n);
        for (int k = 1; k <= n; ++k) {
            // Baseline without the extra street: chain distance k carries
            // exactly 2 * (n - k) ordered pairs.
            result[k - 1] = 2 * (n - k);
        }
        if (x == y) {
            // A self-loop shortens nothing, so the chain distances stand.
            return result;
        }
        if (x > y) {
            swap(x, y);
        }
        int span = y - x;

        // Difference arrays over distance buckets, holding the improving
        // unordered pairs; they are prefixed into exact per-bucket counts.
        vector<long long> departures(n + 2, 0), arrivals(n + 2, 0);
        auto add_range = [&](vector<long long> &diff, int low, int high) {
            // Range update in difference form, skipped when empty.
            if (low <= high) {
                ++diff[low];
                --diff[high + 1];
            }
        };

        // Straddling pairs a < x < y < b: the trip through the shortcut,
        // (x - a) + 1 + (b - y) = (b - a) - span + 1, wins whenever
        // span > 1, moving each pair span - 1 buckets down.
        if (span >= 2) {
            for (int a = 1; a < x; ++a) {
                add_range(departures, y + 1 - a, n - a);
                add_range(arrivals, y + 2 - a - span, n + 1 - a - span);
            }
        }

        // A house left of x with a partner in the shortcut's right half:
        // the trip (x - a) + 1 + (y - b) = x + y + 1 - a - b wins exactly
        // when 2 * b > x + y + 1.
        int right_start = (x + y) / 2 + 1;
        for (int a = 1; a < x; ++a) {
            add_range(departures, right_start - a, y - a);
            add_range(arrivals, x + 1 - a, x + y + 1 - a - right_start);
        }

        // A partner right of y with an in-shortcut house in its left half:
        // the trip (a - x) + 1 + (b - y) = a + b - x - y + 1 wins exactly
        // when 2 * a < x + y - 1.
        int left_end = (x + y - 2) / 2;
        if (left_end >= x) {
            for (int b = y + 1; b <= n; ++b) {
                add_range(departures, b - left_end, b - x);
                add_range(arrivals, b - y + 1, b + left_end - x - y + 1);
            }
        }

        // Prefix the difference encodings into exact per-bucket counts.
        vector<long long> departed(n + 2, 0), arrived(n + 2, 0);
        partial_sum(departures.begin(), departures.end(), departed.begin());
        partial_sum(arrivals.begin(), arrivals.end(), arrived.begin());

        // Both endpoints inside the shortcut segment: the span + 1 houses
        // give gap g exactly span + 1 - g pairs, landing at span + 1 - g.
        // These weights are exact, not differences, so they merge after
        // prefixing rather than into the raw arrays.
        for (int gap = span / 2 + 1; gap <= span; ++gap) {
            departed[gap] += span + 1 - gap;
            arrived[span + 1 - gap] += span + 1 - gap;
        }

        // Every improving unordered pair leaves its chain bucket and lands
        // in its shortened bucket; ordered pairs double both moves.
        for (int k = 1; k <= n; ++k) {
            result[k - 1] += static_cast<int>(2 * (arrived[k] - departed[k]));
        }
        return result;
    }
};
