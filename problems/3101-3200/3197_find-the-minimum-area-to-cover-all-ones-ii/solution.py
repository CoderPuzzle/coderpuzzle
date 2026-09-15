from typing import List

_INF = 1 << 30


def _rotate(g: List[List[int]]) -> List[List[int]]:
    """90-degree clockwise rotation."""
    m, n = len(g), len(g[0])
    return [[g[m - 1 - j][i] for j in range(m)] for i in range(n)]


class Solution:
    def minimumSum(self, grid: List[List[int]]) -> int:
        # Any two disjoint rectangles are separated by a straight line, so
        # three covers always admit a hierarchical split: peel one side band,
        # cover its ones with their tight box, and split the remainder into
        # two tight boxes with one internal cut. Trying every peel and cut
        # over all four rotations finds the optimum. Pieces track genuine
        # tight extents because a peeled band may hold empty rows inside its
        # span.
        best = _INF
        g = grid
        for _ in range(4):
            m, n = len(g), len(g[0])
            firsts, lasts = [-1] * m, [-1] * m
            for r in range(m):
                row = g[r]
                lo = -1
                hi = -1
                for c in range(n):
                    if row[c] == 1:
                        if lo == -1:
                            lo = c
                        hi = c
                firsts[r], lasts[r] = lo, hi
            for i in range(1, m):
                # single rect over the peeled band rows [0..i)
                tany = False
                trlo, trhi, tclo, tchi = m, -1, n, -1
                for r in range(i):
                    if firsts[r] != -1:
                        tany = True
                        trlo = min(trlo, r)
                        trhi = max(trhi, r)
                        tclo = min(tclo, firsts[r])
                        tchi = max(tchi, lasts[r])
                if not tany:
                    continue
                top_area = (trhi - trlo + 1) * (tchi - tclo + 1)

                # two rects over rows [i..m): horizontal cuts
                sh = m - i
                s_any = [False] * (sh + 1)
                s_rlo, s_rhi = [0] * (sh + 1), [-1] * (sh + 1)
                s_clo, s_chi = [n] * (sh + 1), [-1] * (sh + 1)
                brlo, brhi, bclo, bchi, bany = sh, -1, n, -1, False
                for idx in range(sh - 1, -1, -1):
                    if firsts[i + idx] != -1:
                        bany = True
                        brlo = min(brlo, idx)
                        brhi = max(brhi, idx)
                        bclo = min(bclo, firsts[i + idx])
                        bchi = max(bchi, lasts[i + idx])
                    s_any[idx], s_rlo[idx], s_rhi[idx] = bany, brlo, brhi
                    s_clo[idx], s_chi[idx] = bclo, bchi
                inner = _INF
                prlo, prhi, pclo, pchi, pany = sh, -1, n, -1, False
                for idx in range(sh - 1):
                    if firsts[i + idx] != -1:
                        pany = True
                        prlo = min(prlo, idx)
                        prhi = max(prhi, idx)
                        pclo = min(pclo, firsts[i + idx])
                        pchi = max(pchi, lasts[i + idx])
                    if pany and s_any[idx + 1]:
                        cand = (prhi - prlo + 1) * (pchi - pclo + 1) + (s_rhi[idx + 1] - s_rlo[idx + 1] + 1) * (
                            s_chi[idx + 1] - s_clo[idx + 1] + 1
                        )
                        inner = min(inner, cand)

                # two rects over rows [i..m): vertical cuts
                col_lo, col_hi, cseen = [m] * n, [-1] * n, [False] * n
                for idx in range(sh):
                    if firsts[i + idx] == -1:
                        continue
                    row = g[i + idx]
                    for c in range(firsts[i + idx], lasts[i + idx] + 1):
                        if row[c] == 1:
                            cseen[c] = True
                            col_lo[c] = min(col_lo[c], idx)
                            col_hi[c] = max(col_hi[c], idx)
                v_any = [False] * (n + 1)
                v_rlo, v_rhi = [m] * (n + 1), [-1] * (n + 1)
                v_clo, v_chi = [n] * (n + 1), [-1] * (n + 1)
                vrlo, vrhi, vclo, vchi, vany = m, -1, n, -1, False
                for c in range(n - 1, -1, -1):
                    if cseen[c]:
                        vany = True
                        vrlo = min(vrlo, col_lo[c])
                        vrhi = max(vrhi, col_hi[c])
                        vclo = min(vclo, c)
                        vchi = max(vchi, c)
                    v_any[c], v_rlo[c], v_rhi[c] = vany, vrlo, vrhi
                    v_clo[c], v_chi[c] = vclo, vchi
                lrlo, lrhi, lclo, lchi, lany = m, -1, n, -1, False
                for j in range(n - 1):
                    if cseen[j]:
                        lany = True
                        lrlo = min(lrlo, col_lo[j])
                        lrhi = max(lrhi, col_hi[j])
                        lclo = min(lclo, j)
                        lchi = max(lchi, j)
                    if lany and v_any[j + 1]:
                        cand = (lrhi - lrlo + 1) * (lchi - lclo + 1) + (v_rhi[j + 1] - v_rlo[j + 1] + 1) * (
                            v_chi[j + 1] - v_clo[j + 1] + 1
                        )
                        inner = min(inner, cand)

                if inner < _INF:
                    best = min(best, top_area + inner)
            g = _rotate(g)
        # At least three 1's guarantee some valid partition exists.
        return best
