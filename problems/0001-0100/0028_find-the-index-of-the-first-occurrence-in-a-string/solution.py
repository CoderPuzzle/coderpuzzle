class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        # The empty needle occurs at every index by convention; the first is 0.
        if not needle:
            return 0
        m = len(needle)
        # lps[i]: length of the longest proper prefix of needle[:i + 1] that is
        # also a suffix of it — how much of a partial match survives a mismatch.
        lps = [0] * m
        k = 0
        for i in range(1, m):
            while k > 0 and needle[i] != needle[k]:
                k = lps[k - 1]
            if needle[i] == needle[k]:
                k += 1
            lps[i] = k
        # Scan haystack once; k counts the needle characters currently matched
        # ending at haystack[i]. On mismatch k falls back to the longest needle
        # prefix that is still a suffix of the matched window, not to zero.
        k = 0
        for i, ch in enumerate(haystack):
            while k > 0 and ch != needle[k]:
                k = lps[k - 1]
            if ch == needle[k]:
                k += 1
            if k == m:
                return i - m + 1
        return -1
