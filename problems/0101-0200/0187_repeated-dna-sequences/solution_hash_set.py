class Solution:
    def findRepeatedDnaSequences(self, s: str) -> list[str]:
        seen = set()
        # A second set collects each repeated window exactly once, even when
        # it occurs three or more times.
        repeated = set()
        # Slide a fixed 10-letter window; strings shorter than 10 produce no
        # full window and yield an empty result.
        for i in range(len(s) - 9):
            seq = s[i : i + 10]
            if seq in seen:
                # Already seen: this window occurs at least twice.
                repeated.add(seq)
            else:
                seen.add(seq)
        # Sorted output for a deterministic order.
        return sorted(repeated)
