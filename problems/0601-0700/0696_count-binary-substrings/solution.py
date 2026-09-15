class Solution:
    def countBinarySubstrings(self, s: str) -> int:
        # A valid substring is one block of 0's against an equal block of 1's,
        # straddling a single change of character. Around each boundary the
        # centered pairs number exactly min(prev, cur), the run lengths on the
        # two sides — every shorter pair fits inside the two runs, no longer
        # pair stays grouped — so a sweep that tracks the previous and current
        # run lengths, adding min(prev, cur) at each change, counts them all.
        total = 0
        prev = 0
        cur = 1
        for i in range(1, len(s)):
            if s[i] == s[i - 1]:
                cur += 1
            else:
                total += min(prev, cur)
                prev = cur
                cur = 1
        return total + min(prev, cur)
