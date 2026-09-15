class Solution:
    def minSteps(self, s: str, t: str) -> int:
        # Order is irrelevant; only letter counts matter. Every unmatched
        # copy of a letter on either side needs one append on the other,
        # so the answer is the total absolute frequency difference.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        for ch in t:
            counts[ord(ch) - ord("a")] -= 1
        return sum(abs(c) for c in counts)
