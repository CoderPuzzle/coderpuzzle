import bisect
from typing import List


class Solution:
    def getResults(self, queries: List[List[int]]) -> List[bool]:
        # d[i] is the free run at start i: the distance from i to the first
        # obstacle strictly after it. A block of size sz can be laid down at
        # start i exactly when d[i] >= sz -- an obstacle may be touched at
        # either end, so only one strictly inside the block forbids it.
        # Placing an obstacle at t rewrites that affine run across the gap it
        # splits, which this lazy assignment segment tree tracks; each type-2
        # query then asks whether the best run among starts [0, x - sz]
        # reaches sz.
        span = max(q[1] for q in queries if q[0] == 2)
        # Sorted obstacle candidates let a Fenwick tree locate, in O(log),
        # the previously placed obstacle left of each new one.
        cands = sorted({q[1] for q in queries if q[0] == 1})
        k = len(cands)
        fen = [0] * (k + 1)

        def fen_add(i):
            while i <= k:
                fen[i] += 1
                i += i & -i

        def fen_sum(i):
            total = 0
            while i > 0:
                total += fen[i]
                i -= i & -i
            return total

        def fen_kth(target):
            pos = 0
            step = 1 << k.bit_length()
            while step > 0:
                nxt = pos + step
                if nxt <= k and fen[nxt] < target:
                    pos = nxt
                    target -= fen[nxt]
                step >>= 1
            return pos + 1

        seg_max = [0] * (4 * span)
        seg_tag = [0] * (4 * span)  # 0 = untagged; obstacle distances are >= 1

        def build(node, lo, hi):
            if lo == hi:
                # No obstacle yet: read the run as reaching past span, which
                # stays above any achievable sz without inventing blockage.
                seg_max[node] = span - lo
                return
            mid = (lo + hi) // 2
            build(2 * node, lo, mid)
            build(2 * node + 1, mid + 1, hi)
            seg_max[node] = max(seg_max[2 * node], seg_max[2 * node + 1])

        def apply(node, lo, t):
            seg_tag[node] = t
            # The run t - i shrinks as i grows, so the gap's best sits left.
            seg_max[node] = t - lo

        def push(node, lo, mid):
            tag = seg_tag[node]
            if tag:
                apply(2 * node, lo, tag)
                apply(2 * node + 1, mid + 1, tag)
                seg_tag[node] = 0

        def update(node, lo, hi, l, r, t):
            if r < lo or hi < l:
                return
            if l <= lo and hi <= r:
                apply(node, lo, t)
                return
            mid = (lo + hi) // 2
            push(node, lo, mid)
            update(2 * node, lo, mid, l, r, t)
            update(2 * node + 1, mid + 1, hi, l, r, t)
            seg_max[node] = max(seg_max[2 * node], seg_max[2 * node + 1])

        def query(node, lo, hi, l, r):
            if r < lo or hi < l:
                return 0
            if l <= lo and hi <= r:
                return seg_max[node]
            mid = (lo + hi) // 2
            push(node, lo, mid)
            return max(query(2 * node, lo, mid, l, r), query(2 * node + 1, mid + 1, hi, l, r))

        build(1, 0, span - 1)
        result = []
        for row in queries:
            if row[0] == 1:
                t = row[1]
                rank = bisect.bisect_left(cands, t) + 1
                below = fen_sum(rank - 1)
                previous = cands[fen_kth(below) - 1] if below else -1
                fen_add(rank)
                lo = max(previous, 0)
                hi = min(t - 1, span - 1)
                # Everything right of t keeps its old nearest obstacle.
                if lo <= hi:
                    update(1, 0, span - 1, lo, hi, t)
            else:
                x, sz = row[1], row[2]
                start_hi = x - sz
                best = query(1, 0, span - 1, 0, start_hi) if start_hi >= 0 else 0
                result.append(best >= sz)
        return result
