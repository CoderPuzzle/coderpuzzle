from bisect import bisect_right, insort


class MRUQueue:
    """The line rides a virtual tape: value v starts at tape position v and the
    j-th fetch re-appends its element at position n + j, so tape order is
    always line order. front marks the first live slot of the initial run — a
    sorted hole list remembers the vacated ones — while a Fenwick tree over
    the append stamps counts live elements per position, with a stamp-to-value
    map beside it.
    """

    def __init__(self, n: int):
        self.limit = n
        self.front = 1
        self.holes = []
        self.stamps = 10000
        self.step = 1 << (self.stamps.bit_length() - 1)
        self.tree = [0] * (self.stamps + 1)
        self.vals = [0] * (self.stamps + 1)
        self.fetches = 0

    def fetch(self, k: int) -> int:
        init_live = self.limit - self.front + 1 - len(self.holes)
        if k <= init_live:
            lo, hi = self.front, self.limit
            while lo < hi:
                mid = (lo + hi) // 2
                if mid - self.front + 1 - bisect_right(self.holes, mid) >= k:
                    hi = mid
                else:
                    lo = mid + 1
            value = lo
            insort(self.holes, value)
            while self.holes and self.holes[0] == self.front:
                self.holes.pop(0)
                self.front += 1
        else:
            remaining = k - init_live
            pos = 0
            step = self.step
            while step > 0:
                nxt = pos + step
                if nxt <= self.stamps and self.tree[nxt] < remaining:
                    pos = nxt
                    remaining -= self.tree[nxt]
                step >>= 1
            stamp = pos + 1
            value = self.vals[stamp]
            self._add(stamp, -1)
        self.fetches += 1
        self.vals[self.fetches] = value
        self._add(self.fetches, 1)
        return value

    def _add(self, stamp: int, delta: int) -> None:
        while stamp <= self.stamps:
            self.tree[stamp] += delta
            stamp += stamp & -stamp
