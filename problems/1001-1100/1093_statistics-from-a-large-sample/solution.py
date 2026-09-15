from typing import List


class Solution:
    def sampleStats(self, count: List[int]) -> List[float]:
        # One pass over the 256 buckets finds every statistic except the
        # median: min/max are the first/last nonzero buckets, the mode is
        # the largest count, and the mean needs the total count and the
        # weighted value sum.
        total = sum(count)
        first = next(i for i, c in enumerate(count) if c)
        last = max(i for i, c in enumerate(count) if c)
        total_sum = sum(i * c for i, c in enumerate(count))
        mean = total_sum / total
        mode = max(range(len(count)), key=lambda i: count[i])

        # k-th smallest element (1-indexed), found by walking the buckets.
        def kth(k: int) -> int:
            acc = 0
            for i, c in enumerate(count):
                acc += c
                if acc >= k:
                    return i
            return -1

        if total % 2 == 1:
            median = float(kth(total // 2 + 1))
        else:
            median = (kth(total // 2) + kth(total // 2 + 1)) / 2.0
        return [float(first), float(last), mean, median, float(mode)]
