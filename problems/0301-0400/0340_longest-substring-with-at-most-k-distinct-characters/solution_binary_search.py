class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        # Feasibility of a fixed length: does any window of exactly L
        # symbols carry at most k distinct ones? One sweep maintains the
        # multiplicities of the current window, sliding its left edge out
        # one step behind its right edge.
        def feasible(length: int) -> bool:
            if length == 0:
                return True
            counts = {}
            distinct = 0
            for i, ch in enumerate(s):
                counts[ch] = counts.get(ch, 0) + 1
                if counts[ch] == 1:
                    distinct += 1
                if i >= length:
                    outgoing = s[i - length]
                    counts[outgoing] -= 1
                    if counts[outgoing] == 0:
                        distinct -= 1
                if i >= length - 1 and distinct <= k:
                    return True
            return False

        # A substring of a valid window is valid too, so feasibility is
        # monotone in the length — binary search for the longest feasible.
        lo, hi = 0, len(s)
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
