from typing import List


class Solution:
    def separateSquares(self, squares: List[List[int]]) -> float:
        # Sweep the square bottoms/tops in y; between consecutive events the
        # union of active x-intervals — and therefore the covered width — is
        # constant. A segment tree over compressed x-coordinates maintains the
        # covered width; all areas stay exact integers until the final division.
        xs = sorted({v for x, _, l in squares for v in (x, x + l)})
        m = len(xs)
        index = {v: i for i, v in enumerate(xs)}
        events = []
        for x, y, l in squares:
            events.append((y, x, x + l, 1))
            events.append((y + l, x, x + l, -1))
        events.sort()

        count = [0] * (4 * m)
        cover = [0] * (4 * m)

        def update(node: int, lo: int, hi: int, i: int, j: int, delta: int) -> None:
            if j <= lo or hi <= i:
                return
            if i <= lo and hi <= j:
                count[node] += delta
            else:
                mid = (lo + hi) // 2
                update(2 * node, lo, mid, i, j, delta)
                update(2 * node + 1, mid, hi, i, j, delta)
            if count[node] > 0:
                cover[node] = xs[hi] - xs[lo]
            elif hi - lo == 1:
                cover[node] = 0
            else:
                cover[node] = cover[2 * node] + cover[2 * node + 1]

        # Pass 1: record every positive-width band (y0, y1, width, area below
        # the band's start) and accumulate the total covered area.
        bands = []
        total = 0
        k = 0
        n = len(events)
        while k < n:
            y = events[k][0]
            while k < n and events[k][0] == y:
                _, x1, x2, d = events[k]
                update(1, 0, m - 1, index[x1], index[x2], d)
                k += 1
            if k < n:
                width = cover[1]
                if width > 0:
                    bands.append((y, events[k][0], width, total))
                    total += width * (events[k][0] - y)

        # Pass 2: the first band whose end reaches half of the total contains
        # the balance line; solve width * (line - y0) = total/2 - area for it.
        area = 0
        for y0, y1, width, _ in bands:
            after = area + width * (y1 - y0)
            if 2 * after >= total:
                return y0 + (total - 2 * area) / (2.0 * width)
            area = after
        return 0.0  # unreachable: at least one square covers positive area
