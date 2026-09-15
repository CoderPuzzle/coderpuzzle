from itertools import accumulate


class Solution:
    def longestSubsequence(self, nums: List[int]) -> int:
        # E[x][d]: longest subsequence over processed prefixes ending with
        # value x, whose last adjacent difference is >= d (suffix max over d).
        max_v = 300
        E = [[0] * max_v for _ in range(max_v + 1)]
        ans = 1
        for v in nums:
            # Exact-difference lengths ending here: a predecessor with new
            # difference d must sit at value v-d or v+d, and its own last
            # difference must be >= d — exactly what E[..][d] stores.
            lens = [0] * max_v
            for d in range(max_v):
                cand = E[v - d][d] if v - d >= 1 else 0
                if v + d <= max_v and E[v + d][d] > cand:
                    cand = E[v + d][d]
                lens[d] = cand + 1
            # Merge the suffix max of those lengths back into row v, floored
            # at 1 for the singleton [v] (no last difference yet).
            suffix = list(accumulate(reversed(lens), max))
            suffix.reverse()
            E[v] = list(map(max, E[v], suffix))
            if suffix[0] > ans:
                ans = suffix[0]
        return ans
