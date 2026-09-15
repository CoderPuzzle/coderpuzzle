class Solution:
    def partitionString(self, s: str) -> int:
        count = 1
        seen = 0
        for ch in s:
            bit = 1 << (ord(ch) - ord("a"))
            if seen & bit:
                count += 1
                seen = bit
            else:
                seen |= bit
        return count
