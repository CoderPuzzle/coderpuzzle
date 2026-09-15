from typing import List


class Solution:
    def partitionString(self, s: str) -> List[str]:
        # Greedy replay of the procedure: grow the current segment one
        # character at a time and emit it the first moment it is not in the
        # seen set, then start a new segment at the next index. A tail that
        # reaches the end of s while still seen is never emitted — the loop
        # simply ends (Example 2's final "a" is dropped).
        segments: List[str] = []
        seen = set()
        start = 0
        for stop in range(1, len(s) + 1):
            candidate = s[start:stop]
            if candidate not in seen:
                seen.add(candidate)
                segments.append(candidate)
                start = stop
        return segments
