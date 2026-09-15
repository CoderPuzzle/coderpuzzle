from typing import List, Optional


class Solution:
    def maximumSubsequenceCount(self, text: str, pattern: str) -> int:
        # An inserted pattern[0] pairs with the most pattern[1]'s at the
        # very front of text, and an inserted pattern[1] with the most
        # pattern[0]'s at the very end — any interior spot sees only a
        # subset of one of those sides. So the answer is the pairs already
        # in text plus the larger of the two letter counts, and one sweep
        # gathers all three numbers: each pattern[1] is charged with the
        # pattern[0]'s before it. When both pattern letters are equal the
        # same sweep yields k*(k-1)/2 pairs plus a gain of k, which is
        # exactly what one extra copy of that letter adds.
        first, second = pattern[0], pattern[1]
        count_first = count_second = pairs = 0
        for ch in text:
            if ch == second:
                pairs += count_first
                count_second += 1
            if ch == first:
                count_first += 1
        return pairs + max(count_first, count_second)
