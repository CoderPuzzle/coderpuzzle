from typing import List


class Solution:
    def minConnectedGroups(self, intervals: List[List[int]], k: int) -> int:
        # Only the merged components matter: sort the intervals, merge the
        # overlapping ones, and the answer is the component count minus the
        # largest number of consecutive components one new interval can
        # straddle. A new interval of length at most k joins components
        # l through r exactly when their end-to-end span, c_r.start -
        # c_l.end, is at most k (the interval must reach across every
        # component in between, not just the empty gaps). Both endpoint
        # bounds move monotonically, so two pointers find the widest valid
        # window: advance the right end and shrink from the left while the
        # span exceeds k.
        intervals.sort()
        merged: List[List[int]] = []
        for start, end in intervals:
            if merged and start <= merged[-1][1]:
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])
        best = 0
        left = 0
        for right in range(len(merged)):
            while merged[right][0] - merged[left][1] > k:
                left += 1
            best = max(best, right - left)
        return len(merged) - best
