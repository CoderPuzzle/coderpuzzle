class Solution:
    def numberOfWays(self, s: str) -> int:
        zeros = ones = seq01 = seq10 = total = 0
        for ch in s:
            if ch == "0":
                total += seq10
                seq01 += ones
                zeros += 1
            else:
                total += seq01
                seq10 += zeros
                ones += 1
        return total
