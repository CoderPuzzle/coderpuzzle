from bisect import bisect_left, bisect_right
from typing import List


class Solution:
    def maxActiveSectionsAfterTrade(self, s: str, queries: List[List[int]]) -> List[int]:
        ones = s.count("1")
        # Maximal runs of '0's, as parallel start/length arrays; the optimal
        # trade zeroes the '1' run between two zero runs and flips the merge.
        starts = []
        lens = []
        index = 0
        length = len(s)
        while index < length:
            if s[index] == "0":
                run_start = index
                while index < length and s[index] == "0":
                    index += 1
                starts.append(run_start)
                lens.append(index - run_start)
            else:
                index += 1
        groups = len(starts)
        ends = [starts[k] + lens[k] - 1 for k in range(groups)]

        # Sparse table for range maximum over adjacent sums lens[k]+lens[k+1].
        table = []
        if groups >= 2:
            size = groups - 1
            table.append([lens[k] + lens[k + 1] for k in range(size)])
            while (1 << len(table)) <= size:
                previous = table[-1]
                step = 1 << (len(table) - 1)
                table.append([max(previous[q], previous[q + step]) for q in range(size - 2 * step + 1)])
            logs = [0] * (size + 1)
            for q in range(2, size + 1):
                logs[q] = logs[q // 2] + 1

        answer = []
        for left, right in queries:
            gain = 0
            if groups >= 2:
                # Zero runs clipped by the window edges only shrink the two
                # boundary pairs; every fully interior pair is exact.
                first = bisect_left(ends, left)
                last = bisect_right(starts, right) - 2
                if first <= last:
                    clip_left = min(lens[first], ends[first] - left + 1)
                    clip_right = min(lens[last + 1], right - starts[last + 1] + 1)
                    if first == last:
                        pair_first = clip_left + clip_right
                        pair_last = pair_first
                    else:
                        pair_first = clip_left + lens[first + 1]
                        pair_last = lens[last] + clip_right
                    inner_lo = first + (1 if s[left] == "0" else 0)
                    inner_hi = last - (1 if s[right] == "0" else 0)
                    inner = 0
                    if inner_lo <= inner_hi:
                        level = logs[inner_hi - inner_lo + 1]
                        row = table[level]
                        inner = max(row[inner_lo], row[inner_hi - (1 << level) + 1])
                    gain = max(pair_first, pair_last, inner)
            answer.append(ones + gain)
        return answer
