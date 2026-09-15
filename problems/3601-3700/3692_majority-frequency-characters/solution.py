class Solution:
    def majorityFrequencyGroup(self, s: str) -> str:
        # Tally every occurrence into a fixed 26-slot table; the
        # lowercase-only input makes each index a plain ord() offset.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        # Evaluate each candidate frequency's bucket and keep the largest
        # gathering of distinct characters; sweeping frequencies upward lets
        # ">=" hand size ties to the larger frequency, and the ascending slot
        # scan collects the winners already in lexicographic order.
        best_chars = []
        for k in range(1, len(s) + 1):
            chars = [chr(ord("a") + i) for i, c in enumerate(counts) if c == k]
            if len(chars) >= len(best_chars):
                best_chars = chars
        return "".join(best_chars)
