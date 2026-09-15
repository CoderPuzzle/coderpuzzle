class Solution:
    def minimumKeypresses(self, s: str) -> int:
        # Each letter's press count is its position among the sorted
        # frequencies: the most frequent 9 are pressed once, the next 9
        # twice, and the remaining 8 three times.
        freq = [0] * 26
        for ch in s:
            freq[ord(ch) - ord("a")] += 1
        freq.sort(reverse=True)
        presses = 0
        for rank, count in enumerate(freq):
            presses += count * (rank // 9 + 1)
        return presses
