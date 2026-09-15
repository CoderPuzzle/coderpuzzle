class Solution:
    def firstUniqChar(self, s: str) -> int:
        # A character is non-repeating exactly when it occurs once in the
        # whole string — a global fact no prefix can settle — so the first
        # pass tallies occurrences, one slot per letter of the alphabet.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        # The second pass scans in index order for the first slot reading
        # exactly 1 — scanning left to right is what answers "first" — and
        # reaching the end without a hit means -1.
        for i, ch in enumerate(s):
            if counts[ord(ch) - ord("a")] == 1:
                return i
        return -1
