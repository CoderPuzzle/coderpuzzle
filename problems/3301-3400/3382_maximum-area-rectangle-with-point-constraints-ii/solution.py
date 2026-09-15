class Solution:
    def maxRectangleArea(self, xCoord: List[int], yCoord: List[int]) -> int:
        # Sweep columns right-to-left. Compress both axes; a candidate
        # rectangle's left edge is two consecutive points (in y order) of
        # one column. The nearest column to the right holding any point
        # with y in [y1, y2] is the only possible right edge: any farther
        # column would keep that nearest point inside or on the border.
        # A min segment tree over compressed y, seeded with column indices
        # as columns are passed, answers "nearest column with a point in
        # y-range [a, b]" as a range-min query. The right column must hold
        # exactly y1 and y2 inside the range (both corners, nothing
        # between or on the border). Areas reach 8e7 * 8e7 = 6.4e15, so
        # the product is widened to 64-bit.
        import bisect

        xs = sorted(set(xCoord))
        ys = sorted(set(yCoord))
        xidx = {v: i for i, v in enumerate(xs)}
        yidx = {v: i for i, v in enumerate(ys)}
        n = len(xCoord)
        order = sorted(range(n), key=lambda i: (xCoord[i], yCoord[i]))
        cx = [0] * n
        cy = [0] * n
        for p, i in enumerate(order):
            cx[p] = xidx[xCoord[i]]
            cy[p] = yidx[yCoord[i]]
        # Column c's compressed ys, ascending (points sorted by x then y).
        cols = []
        p = 0
        while p < n:
            q = p + 1
            while q < n and cx[q] == cx[p]:
                q += 1
            cols.append(cy[p:q])
            p = q
        m = len(cols)
        k = len(ys)
        size = 1
        while size < k:
            size *= 2
        INF = m
        tree = [INF] * (2 * size)

        def update(pos, val):
            # chmin at pos, climbing while the parent improves
            i = pos + size
            while i and tree[i] > val:
                tree[i] = val
                i >>= 1

        def query(lo, hi):
            # min over leaves [lo, hi] inclusive
            res = INF
            l = lo + size
            r = hi + size + 1
            while l < r:
                if l & 1:
                    if tree[l] < res:
                        res = tree[l]
                    l += 1
                if r & 1:
                    r -= 1
                    if tree[r] < res:
                        res = tree[r]
                l >>= 1
                r >>= 1
            return res

        best = -1
        for c in range(m - 1, -1, -1):
            col = cols[c]
            for t in range(len(col) - 1):
                a, b = col[t], col[t + 1]
                r = query(a, b)
                if r < INF:
                    arr = cols[r]
                    lo = bisect.bisect_left(arr, a)
                    hi = bisect.bisect_left(arr, b + 1)
                    if hi - lo == 2 and arr[lo] == a and arr[lo + 1] == b:
                        area = (xs[r] - xs[c]) * (ys[b] - ys[a])
                        if area > best:
                            best = area
            for yy in col:
                update(yy, c)
        return best
