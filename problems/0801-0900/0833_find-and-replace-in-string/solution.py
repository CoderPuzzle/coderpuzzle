from typing import List, Optional


class Solution:
    def findReplaceString(self, s: str, indices: List[int], sources: List[str], targets: List[str]) -> str:
        # Replacements are simultaneous: each match is judged against the
        # original string, so first record every operation that succeeds —
        # sources[i] read from indices[i] — as a map from start position to
        # operation, then walk s once. A position holding a winner emits its
        # target and skips the consumed source; every other character copies
        # through unchanged. The non-overlap guarantee means a skip never
        # lands inside another winner's span.
        n = len(s)
        match: List[int] = [-1] * n
        for op in range(len(indices)):
            if s.startswith(sources[op], indices[op]):
                match[indices[op]] = op
        pieces: List[str] = []
        i = 0
        while i < n:
            op = match[i]
            if op >= 0:
                pieces.append(targets[op])
                i += len(sources[op])
            else:
                pieces.append(s[i])
                i += 1
        return "".join(pieces)
