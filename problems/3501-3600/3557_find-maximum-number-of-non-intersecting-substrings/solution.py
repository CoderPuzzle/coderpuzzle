class Solution:
    def maxSubstrings(self, word: str) -> int:
        # Substrings may not share an index, so this is interval scheduling:
        # taking the earliest-finishing valid substring at each step can
        # never push a later choice further right. Scan once, remember each
        # letter's first index inside the current window, and when the
        # running index reaches 3 past it, take that substring and restart
        # the window just past its end.
        first = [-1] * 26
        count = 0
        for i, ch in enumerate(word):
            c = ord(ch) - 97
            if first[c] < 0:
                first[c] = i
            if i - first[c] >= 3:
                count += 1
                first = [-1] * 26
        return count
