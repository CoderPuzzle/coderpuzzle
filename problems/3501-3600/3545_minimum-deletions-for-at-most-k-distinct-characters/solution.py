class Solution:
    def minDeletion(self, s: str, k: int) -> int:
        # At most k distinct characters may survive, so keep the k most
        # frequent ones and delete every occurrence of the rest: the
        # answer is the sum of the (distinct - k) smallest frequencies.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        freqs = sorted(f for f in counts if f > 0)
        return sum(freqs[: max(0, len(freqs) - k)])
