from typing import List


class Solution:
    def fairCandySwap(self, aliceSizes: List[int], bobSizes: List[int]) -> List[int]:
        # Swapping Alice's box a for Bob's box b leaves both totals equal
        # exactly when sumA - a + b == sumB - b + a, which rearranges to
        # b == a - delta with delta = (sumA - sumB) / 2. A hash set of
        # Bob's boxes answers each candidate in O(1), and one scan that
        # keeps the smallest matching pair (a first, then b) yields the
        # statement's pinned answer.
        delta = (sum(aliceSizes) - sum(bobSizes)) // 2
        bobBoxes = set(bobSizes)
        best = None
        for a in aliceSizes:
            b = a - delta
            if b in bobBoxes and (best is None or (a, b) < best):
                best = (a, b)
        return list(best) if best is not None else []
