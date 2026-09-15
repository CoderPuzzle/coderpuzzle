class Solution:
    def minCharacters(self, a: str, b: str) -> int:
        # An operation retargets one character anywhere, so only letter
        # counts matter. Condition 3 unifies both strings on one letter c:
        # every character that is not already c pays once. Conditions 1
        # and 2 share a boundary after letter c — the lower string pays
        # its letters above c, the higher one its letters at or below c —
        # and one sweep with running below/above totals prices both
        # orientations at once. The boundary stops after 'y': nothing can
        # sit above 'z', so 'z' can never cap the lower string.
        counts_a = [0] * 26
        counts_b = [0] * 26
        for c in a:
            counts_a[ord(c) - ord("a")] += 1
        for c in b:
            counts_b[ord(c) - ord("a")] += 1
        best = len(a) + len(b)
        for i in range(26):
            best = min(best, len(a) - counts_a[i] + len(b) - counts_b[i])
        above_a = len(a)
        above_b = len(b)
        below_a = 0
        below_b = 0
        for i in range(25):
            above_a -= counts_a[i]
            above_b -= counts_b[i]
            below_a += counts_a[i]
            below_b += counts_b[i]
            best = min(best, above_a + below_b, above_b + below_a)
        return best
