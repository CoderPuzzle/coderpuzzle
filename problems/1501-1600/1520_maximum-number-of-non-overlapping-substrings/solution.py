from typing import List


class Solution:
    def maxNumOfSubstrings(self, s: str) -> List[str]:
        n = len(s)
        first = {}
        last = {}
        for i, c in enumerate(s):
            if c not in first:
                first[c] = i
            last[c] = i

        # Anchor a candidate at every position that is the first occurrence
        # of its character, then push `end` out to cover every character
        # met along the way. The expansion is a fixed point: it stops the
        # moment nothing inside [start, end] demands more room.
        candidates = []
        for i, c0 in enumerate(s):
            if first[c0] != i:
                continue
            start, end = i, last[c0]
            j = start
            valid = True
            while j <= end:
                c = s[j]
                if first[c] < start:
                    # This character escapes to the left of the anchor, so
                    # no substring starting at `i` can ever be valid.
                    valid = False
                    break
                end = max(end, last[c])
                j += 1
            if valid:
                candidates.append((start, end))

        # Classic activity-selection greedy: earliest-ending candidate
        # first, ties broken by length so a shorter, nested candidate is
        # preferred over the longer one that contains it.
        candidates.sort(key=lambda pair: (pair[1], pair[1] - pair[0]))
        result = []
        prev_end = -1
        for start, end in candidates:
            if start > prev_end:
                result.append(s[start : end + 1])
                prev_end = end
        return result
