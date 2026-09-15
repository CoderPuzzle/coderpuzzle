from typing import List


class Solution:
    def minTime(self, s: str, order: List[int], k: int) -> int:
        n = len(s)
        # Once every character is a '*', all n * (n + 1) / 2 substrings are
        # valid; if even that total falls short of k, no time ever works.
        total = n * (n + 1) // 2
        if total < k:
            return -1

        # Number of substrings holding at least one star after the first
        # t + 1 positions are starred: the total minus what the star-free
        # runs hide, each maximal run of length L hiding 1 + 2 + ... + L.
        def valid_count(t):
            starred = bytearray(n)
            for i in range(t + 1):
                starred[order[i]] = 1
            invalid = run = 0
            for flag in starred:
                if flag:
                    run = 0
                else:
                    run += 1
                    invalid += run
            return total - invalid

        # Each replacement only turns more substrings valid, so activity is
        # monotone in t and the earliest active time admits a binary search.
        # Feasibility at t = n - 1 is guaranteed by the early return above.
        lo, hi = 0, n - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if valid_count(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo
