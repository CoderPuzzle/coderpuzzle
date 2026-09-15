class Solution:
    def minimumRecolors(self, blocks: str, k: int) -> int:
        # The answer is the window of k consecutive blocks containing the
        # fewest whites; a sliding window updates that count in O(1) as it
        # moves — add the entering block, drop the leaving one.
        whites = sum(1 for c in blocks[:k] if c == "W")
        best = whites
        for right in range(k, len(blocks)):
            if blocks[right] == "W":
                whites += 1
            if blocks[right - k] == "W":
                whites -= 1
            best = min(best, whites)
        return best
