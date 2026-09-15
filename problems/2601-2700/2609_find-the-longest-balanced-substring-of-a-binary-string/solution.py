class Solution:
    def findTheLongestBalancedSubstring(self, s: str) -> int:
        # One pass with two run counters: `zeros` is the length of the zero
        # block currently ending (reset when a fresh block starts after ones),
        # `ones` is the running tail of consecutive ones. A balanced substring
        # is always a prefix-tail pairing min(zeros, ones) of both, so every
        # one seen offers 2 * min as a candidate answer.
        best = zeros = ones = 0
        prev = ""
        for ch in s:
            if ch == "0":
                # A zero after ones starts a brand-new block; consecutive
                # zeroes keep extending theirs.
                zeros = zeros + 1 if prev == "0" else 1
                ones = 0
            else:
                ones += 1
                if 2 * min(zeros, ones) > best:
                    best = 2 * min(zeros, ones)
            prev = ch
        return best
