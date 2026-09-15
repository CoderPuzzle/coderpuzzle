from typing import List, Optional


class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        # Upper bound over the half-open range [lo, hi): the first index
        # whose letter is strictly greater than target. The wrap below
        # handles the case where no letter qualifies.
        lo, hi = 0, len(letters)
        while lo < hi:
            mid = (lo + hi) // 2
            if letters[mid] <= target:
                # At or below target — not strictly greater — so the answer
                # sits strictly right of mid.
                lo = mid + 1
            else:
                # letters[mid] > target keeps mid a live candidate.
                hi = mid
        # No letter is strictly greater: wrap to the first letter.
        return letters[lo] if lo < len(letters) else letters[0]
