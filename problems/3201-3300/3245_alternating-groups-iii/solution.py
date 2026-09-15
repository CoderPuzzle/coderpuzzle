from bisect import bisect_left
from typing import List


class Solution:
    def numberOfAlternatingGroups(self, colors: List[int], queries: List[List[int]]) -> List[int]:
        # Edge j joins tile j and tile j + 1 circularly and is bad when its two
        # endpoints share a color. A size-k group starting at tile s spans the
        # k - 1 consecutive edges s..s+k-2, so counting size-k groups means
        # counting starting edges followed by k - 1 good edges. Keep the bad
        # edges in a sorted list and the multiset of good-edge runs between
        # neighboring bad edges in two Fenwick trees keyed by run length (one
        # counting runs, one summing lengths); a repaint toggles exactly two
        # edges, each splitting or merging a single run, and with no bad edge
        # left every one of the n starts works.
        colors = list(colors)
        n = len(colors)
        bad = [colors[j] == colors[(j + 1) % n] for j in range(n)]
        bads = [j for j in range(n) if bad[j]]
        fen_cnt = [0] * (n + 1)
        fen_sum = [0] * (n + 1)
        cnt_all = 0
        sum_all = 0

        def fen_add(fen, length, delta):
            i = length + 1
            while i <= n:
                fen[i] += delta
                i += i & (-i)

        def fen_prefix(fen, length):
            i = length + 1
            total = 0
            while i > 0:
                total += fen[i]
                i -= i & (-i)
            return total

        def runs_update(length, delta):
            nonlocal cnt_all, sum_all
            if length > 0:
                fen_add(fen_cnt, length, delta)
                fen_add(fen_sum, length, delta * length)
                cnt_all += delta
                sum_all += delta * length

        m = len(bads)
        for idx in range(m):
            nxt = bads[(idx + 1) % m]
            runs_update((nxt - bads[idx] - 1) % n, 1)

        answer = []
        for query in queries:
            if query[0] == 1:
                if not bads:
                    answer.append(n)
                    continue
                need = query[1] - 1
                cnt_ge = cnt_all - fen_prefix(fen_cnt, need - 1)
                sum_ge = sum_all - fen_prefix(fen_sum, need - 1)
                answer.append(sum_ge - (need - 1) * cnt_ge)
            else:
                index, color = query[1], query[2]
                if colors[index] == color:
                    continue
                colors[index] = color
                for edge in ((index + n - 1) % n, index):
                    is_bad = colors[edge] == colors[(edge + 1) % n]
                    if is_bad == bad[edge]:
                        continue
                    bad[edge] = is_bad
                    pos = bisect_left(bads, edge)
                    if is_bad:
                        if bads:
                            prev_edge = bads[pos - 1] if pos > 0 else bads[-1]
                            next_edge = bads[pos] if pos < len(bads) else bads[0]
                            runs_update((next_edge - prev_edge - 1) % n, -1)
                            runs_update((edge - prev_edge - 1) % n, 1)
                            runs_update((next_edge - edge - 1) % n, 1)
                            bads.insert(pos, edge)
                        else:
                            bads.insert(pos, edge)
                            runs_update(n - 1, 1)
                    else:
                        del bads[pos]
                        if bads:
                            prev_edge = bads[pos - 1] if pos > 0 else bads[-1]
                            next_edge = bads[pos] if pos < len(bads) else bads[0]
                            runs_update((edge - prev_edge - 1) % n, -1)
                            runs_update((next_edge - edge - 1) % n, -1)
                            runs_update((next_edge - prev_edge - 1) % n, 1)
                        else:
                            runs_update(n - 1, -1)
        return answer
