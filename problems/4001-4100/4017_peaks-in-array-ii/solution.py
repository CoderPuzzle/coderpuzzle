from bisect import bisect_left, bisect_right
from typing import List


class Solution:
    def countOfPeaks(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        n = len(nums)
        nums = list(nums)

        def is_peak(i):
            return 0 < i < n - 1 and nums[i] > nums[i - 1] and nums[i] > nums[i + 1]

        # Ordered peak positions plus a Fenwick tree holding
        # value[p] = p * (p - prev(p)) for every present peak p.
        peaks = []
        fen = [0] * (n + 1)

        def fen_add(i, delta):
            i += 1
            while i <= n:
                fen[i] += delta
                i += i & (-i)

        def fen_prefix(i):
            i += 1
            total = 0
            while i > 0:
                total += fen[i]
                i -= i & (-i)
            return total

        def insert_peak(x):
            c = bisect_left(peaks, x)
            prev_p = peaks[c - 1] if c >= 1 else 0
            peaks.insert(c, x)
            fen_add(x, x * (x - prev_p))
            if c + 1 < len(peaks):
                s = peaks[c + 1]
                fen_add(s, s * (s - x) - s * (s - prev_p))

        def remove_peak(x):
            c = bisect_left(peaks, x)
            prev_p = peaks[c - 1] if c >= 1 else 0
            s = peaks[c + 1] if c + 1 < len(peaks) else None
            del peaks[c]
            fen_add(x, -(x * (x - prev_p)))
            if s is not None:
                fen_add(s, s * (s - prev_p) - s * (s - x))

        for i in range(1, n - 1):
            if is_peak(i):
                insert_peak(i)

        answer = []
        for t, x, y in queries:
            if t == 1:
                l, r = x, y
                ca = bisect_right(peaks, l)
                if ca >= len(peaks) or peaks[ca] >= r:
                    answer.append(0)
                    continue
                a = peaks[ca]
                b = peaks[bisect_left(peaks, r) - 1]
                q = peaks[ca - 1] if ca >= 1 else 0
                w = fen_prefix(b) - fen_prefix(a - 1)
                answer.append(r * (b - l) - w + a * (l - q))
            else:
                idx, val = x, y
                for cand in (idx - 1, idx, idx + 1):
                    if is_peak(cand):
                        remove_peak(cand)
                nums[idx] = val
                for cand in (idx - 1, idx, idx + 1):
                    if is_peak(cand):
                        insert_peak(cand)
        return answer
