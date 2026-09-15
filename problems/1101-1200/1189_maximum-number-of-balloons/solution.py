class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        counts = [0] * 26
        for ch in text:
            counts[ord(ch) - 97] += 1
        # balloon needs b, a, n once and l, o twice; the scarcest letter
        # caps the whole word.
        return min(counts[1], counts[0], counts[13], counts[11] // 2, counts[14] // 2)
