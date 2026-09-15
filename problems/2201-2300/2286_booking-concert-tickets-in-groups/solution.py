class BookMyShow:
    def __init__(self, n: int, m: int) -> None:
        self.n = n
        self.m = m
        self.remaining = [m] * n
        self.sums = [0] * (4 * n)
        self.maxs = [0] * (4 * n)
        if n:
            self._build(1, 0, n - 1)

    def _build(self, node: int, lo: int, hi: int) -> None:
        if lo == hi:
            self.sums[node] = self.remaining[lo]
            self.maxs[node] = self.remaining[lo]
            return
        mid = (lo + hi) // 2
        self._build(2 * node, lo, mid)
        self._build(2 * node + 1, mid + 1, hi)
        self._pull(node)

    def _pull(self, node: int) -> None:
        left, right = 2 * node, 2 * node + 1
        self.sums[node] = self.sums[left] + self.sums[right]
        self.maxs[node] = max(self.maxs[left], self.maxs[right])

    def _update(self, node: int, lo: int, hi: int, index: int, value: int) -> None:
        if lo == hi:
            self.remaining[index] = value
            self.sums[node] = value
            self.maxs[node] = value
            return
        mid = (lo + hi) // 2
        if index <= mid:
            self._update(2 * node, lo, mid, index, value)
        else:
            self._update(2 * node + 1, mid + 1, hi, index, value)
        self._pull(node)

    def _range_sum(self, node: int, lo: int, hi: int, left: int, right: int) -> int:
        if right < lo or hi < left:
            return 0
        if left <= lo and hi <= right:
            return self.sums[node]
        mid = (lo + hi) // 2
        return self._range_sum(2 * node, lo, mid, left, right) + self._range_sum(2 * node + 1, mid + 1, hi, left, right)

    def _first_at_least(self, node: int, lo: int, hi: int, left: int, right: int, k: int) -> int:
        """Smallest index in [left, right] with remaining >= k, or -1."""
        if right < lo or hi < left or self.maxs[node] < k:
            return -1
        if lo == hi:
            return lo
        mid = (lo + hi) // 2
        found = self._first_at_least(2 * node, lo, mid, left, right, k)
        if found != -1:
            return found
        return self._first_at_least(2 * node + 1, mid + 1, hi, left, right, k)

    def gather(self, k: int, maxRow: int) -> list[int]:
        row = self._first_at_least(1, 0, self.n - 1, 0, maxRow, k)
        if row == -1:
            return []
        column = self.m - self.remaining[row]
        self._update(1, 0, self.n - 1, row, self.remaining[row] - k)
        return [row, column]

    def scatter(self, k: int, maxRow: int) -> bool:
        if self._range_sum(1, 0, self.n - 1, 0, maxRow) < k:
            return False
        row = 0
        while k > 0:
            row = self._first_at_least(1, 0, self.n - 1, row, maxRow, 1)
            take = min(self.remaining[row], k)
            k -= take
            self._update(1, 0, self.n - 1, row, self.remaining[row] - take)
            row += 1
        return True
