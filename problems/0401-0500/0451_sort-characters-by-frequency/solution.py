class Solution:
    def frequencySort(self, s: str) -> str:
        # The answer depends only on how often each character occurs, and the
        # alphabet is fixed — one slot per possible character, one pass.
        counts = [0] * 128
        for ch in s:
            counts[ord(ch)] += 1
        # Frequency descending, ties broken by character ascending — the
        # pinned order that makes the expected output unique.
        ranked = sorted(range(128), key=lambda c: (-counts[c], c))
        return "".join(chr(c) * counts[c] for c in ranked)
