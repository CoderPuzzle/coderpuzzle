from typing import List, Optional


class Solution:
    def appealSum(self, s: str) -> int:
        # flip the accounting: per character, count the substrings containing it
        last = {}
        total = 0
        # current = total appeal of all substrings ending at i
        current = 0
        for i, c in enumerate(s):
            # c is counted in the substrings ending at i that start after its
            # previous occurrence: i - last[c] of them (default -1 -> i + 1 starts)
            current += i - last.get(c, -1)
            last[c] = i
            # each substring is charged once per distinct char it contains: its appeal
            total += current
        return total
