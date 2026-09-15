from typing import List, Optional


class Solution:
    def maxRequests(self, requests: List[List[int]], k: int, window: int) -> int:
        # The limit is per user, so users never interact: group each user's
        # times, sort them, and greedily keep every time whose k-back kept
        # predecessor sits more than window away. The kept count is at most
        # the request count <= 10^5, so plain ints are exact throughout.
        by_user = {}
        for user, time in requests:
            by_user.setdefault(user, []).append(time)
        total = 0
        for times in by_user.values():
            times.sort()
            kept = []
            for t in times:
                # Appending t is legal iff the k+1 last kept times span
                # strictly more than window: t - kept[-k] > window.
                if len(kept) < k or t - kept[len(kept) - k] > window:
                    kept.append(t)
            total += len(kept)
        return total
