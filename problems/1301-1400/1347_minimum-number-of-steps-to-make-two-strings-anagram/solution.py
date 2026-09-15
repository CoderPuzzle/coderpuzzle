class Solution:
    def minSteps(self, s: str, t: str) -> int:
        # The answer is the per-letter deficit of t relative to s; each
        # replacement clears one unit, and deficits equal surpluses.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - 97] += 1
        for ch in t:
            counts[ord(ch) - 97] -= 1
        return sum(-delta for delta in counts if delta < 0)
