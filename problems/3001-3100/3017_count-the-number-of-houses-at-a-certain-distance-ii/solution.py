from itertools import accumulate
from typing import List


class Solution:
    def countOfPairs(self, n: int, x: int, y: int) -> List[int]:
        # Baseline without the extra street: chain distance k carries
        # exactly 2 * (n - k) ordered pairs.
        result = [2 * (n - k) for k in range(1, n + 1)]
        if x == y:
            # A self-loop shortens nothing, so the chain distances stand.
            return result
        if x > y:
            x, y = y, x
        span = y - x

        # Difference arrays over distance buckets, holding the improving
        # unordered pairs; they are prefixed into exact per-bucket counts.
        departures = [0] * (n + 2)
        arrivals = [0] * (n + 2)

        def add_range(low: int, high: int, source: List[int]) -> None:
            # Range update in difference form, skipped when empty.
            if low <= high:
                source[low] += 1
                source[high + 1] -= 1

        # Straddling pairs a < x < y < b: the trip through the shortcut,
        # (x - a) + 1 + (b - y) = (b - a) - span + 1, wins whenever
        # span > 1, moving each pair span - 1 buckets down.
        if span >= 2:
            for a in range(1, x):
                add_range(y + 1 - a, n - a, departures)
                add_range(y + 2 - a - span, n + 1 - a - span, arrivals)

        # A house left of x with a partner in the shortcut's right half:
        # the trip (x - a) + 1 + (y - b) = x + y + 1 - a - b wins exactly
        # when 2 * b > x + y + 1.
        right_start = (x + y) // 2 + 1
        for a in range(1, x):
            add_range(right_start - a, y - a, departures)
            add_range(x + 1 - a, x + y + 1 - a - right_start, arrivals)

        # A partner right of y with an in-shortcut house in its left half:
        # the trip (a - x) + 1 + (b - y) = a + b - x - y + 1 wins exactly
        # when 2 * a < x + y - 1.
        left_end = (x + y - 2) // 2
        if left_end >= x:
            for b in range(y + 1, n + 1):
                add_range(b - left_end, b - x, departures)
                add_range(b - y + 1, b + left_end - x - y + 1, arrivals)

        # Prefix the difference encodings into exact per-bucket counts.
        departed = list(accumulate(departures))
        arrived = list(accumulate(arrivals))

        # Both endpoints inside the shortcut segment: the span + 1 houses
        # give gap g exactly span + 1 - g pairs, landing at span + 1 - g.
        # These weights are exact, not differences, so they merge after
        # prefixing rather than into the raw arrays.
        for gap in range(span // 2 + 1, span + 1):
            departed[gap] += span + 1 - gap
            arrived[span + 1 - gap] += span + 1 - gap

        # Every improving unordered pair leaves its chain bucket and lands
        # in its shortened bucket; ordered pairs double both moves.
        for k in range(1, n + 1):
            result[k - 1] += 2 * (arrived[k] - departed[k])
        return result
