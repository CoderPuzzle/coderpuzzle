class Solution:
    def countValidPrefixes(self, s: str) -> int:
        # A prefix rearranges into an alternating string exactly when its counts
        # of '0' and '1' differ by at most one, so track both running counts
        # through one pass and count the prefixes whose balance stays within one.
        zeros = 0
        ones = 0
        valid = 0
        for ch in s:
            if ch == "0":
                zeros += 1
            else:
                ones += 1
            if abs(zeros - ones) <= 1:
                valid += 1
        return valid
