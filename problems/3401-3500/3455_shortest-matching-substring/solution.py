from typing import List, Optional

from bisect import bisect_right


class Solution:
    def shortestMatchingSubstring(self, s: str, p: str) -> int:
        def _find_all(s, pat):
            result = []
            start = 0
            while True:
                idx = s.find(pat, start)
                if idx == -1:
                    break
                result.append(idx)
                start = idx + 1
            return result

        a, b, c = p.split("*")
        occ_a = _find_all(s, a) if a else []
        occ_b = _find_all(s, b) if b else []
        occ_c = _find_all(s, c) if c else []

        segs = []
        if a:
            segs.append((len(a), occ_a))
        if b:
            segs.append((len(b), occ_b))
        if c:
            segs.append((len(c), occ_c))

        if not segs:
            return 0
        if len(segs) == 1:
            ln, occ = segs[0]
            return ln if occ else -1
        if len(segs) == 2:
            l1, occ1 = segs[0]
            l2, occ2 = segs[1]
            best = None
            for j in occ2:
                idx = bisect_right(occ1, j - l1) - 1
                if idx >= 0:
                    cand = j + l2 - occ1[idx]
                    if best is None or cand < best:
                        best = cand
            return best if best is not None else -1
        # three non-empty segments
        l1, occ1 = segs[0]
        l2, occ2 = segs[1]
        l3, occ3 = segs[2]
        best_i_for_j = []
        for j in occ2:
            idx = bisect_right(occ1, j - l1) - 1
            best_i_for_j.append(occ1[idx] if idx >= 0 else None)
        best = None
        for k in occ3:
            j_idx = bisect_right(occ2, k - l2) - 1
            if j_idx >= 0 and best_i_for_j[j_idx] is not None:
                cand = k + l3 - best_i_for_j[j_idx]
                if best is None or cand < best:
                    best = cand
        return best if best is not None else -1
