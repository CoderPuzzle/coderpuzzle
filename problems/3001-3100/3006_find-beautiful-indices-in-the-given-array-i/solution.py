from bisect import bisect_left
from typing import List


class Solution:
    def beautifulIndices(self, s: str, a: str, b: str, k: int) -> List[int]:
        # An index is beautiful exactly when it is an occurrence of a whose
        # window [i - k, i + k] contains an occurrence of b. Collect both
        # occurrence lists once — each find restarts one character past the
        # previous hit so overlapping occurrences are not skipped — then for
        # each a-occurrence binary-search the sorted b-list for the leftmost
        # entry >= i - k; it qualifies iff that entry also satisfies
        # <= i + k. Ascending a-occurrences keep the answer ascending.
        def occurrences(pattern: str) -> List[int]:
            found = []
            start = s.find(pattern)
            while start != -1:
                found.append(start)
                start = s.find(pattern, start + 1)
            return found

        where_b = occurrences(b)
        answer = []
        for i in occurrences(a):
            candidate = bisect_left(where_b, i - k)
            if candidate < len(where_b) and where_b[candidate] <= i + k:
                answer.append(i)
        return answer
