from bisect import bisect_left


class MajorityChecker:
    """A segment tree whose nodes carry the Boyer-Moore candidate of their
    range (children folded left-to-right); a query surfaces the only value
    that could possibly reach the threshold, which per-value sorted
    position lists then verify with two binary searches."""

    def __init__(self, arr: list[int]) -> None:
        self.n = len(arr)
        self.tree = [(0, 0)] * (4 * self.n)  # (candidate, surplus votes)
        self._build(1, 0, self.n - 1, arr)
        self.positions: dict[int, list[int]] = {}
        for index, value in enumerate(arr):
            self.positions.setdefault(value, []).append(index)

    def _build(self, node: int, lo: int, hi: int, arr: list[int]) -> None:
        if lo == hi:
            self.tree[node] = (arr[lo], 1)
            return
        mid = (lo + hi) // 2
        self._build(2 * node, lo, mid, arr)
        self._build(2 * node + 1, mid + 1, hi, arr)
        self.tree[node] = self._merge(self.tree[2 * node], self.tree[2 * node + 1])

    @staticmethod
    def _merge(left: tuple[int, int], right: tuple[int, int]) -> tuple[int, int]:
        (left_value, left_votes), (right_value, right_votes) = left, right
        if left_value == right_value:
            return (left_value, left_votes + right_votes)
        if left_votes > right_votes:
            return (left_value, left_votes - right_votes)
        if right_votes > left_votes:
            return (right_value, right_votes - left_votes)
        return (0, 0)  # perfect tie: no candidate survives (0 is never an arr value)

    def query(self, left: int, right: int, threshold: int) -> int:
        candidate = self._fold(1, 0, self.n - 1, left, right)[0]
        occurrences = self.positions.get(candidate, [])
        count = bisect_left(occurrences, right + 1) - bisect_left(occurrences, left)
        return candidate if count >= threshold else -1

    def _fold(self, node: int, lo: int, hi: int, left: int, right: int) -> tuple[int, int]:
        if left <= lo and hi <= right:
            return self.tree[node]
        mid = (lo + hi) // 2
        if right <= mid:
            return self._fold(2 * node, lo, mid, left, right)
        if left > mid:
            return self._fold(2 * node + 1, mid + 1, hi, left, right)
        return self._merge(
            self._fold(2 * node, lo, mid, left, right),
            self._fold(2 * node + 1, mid + 1, hi, left, right),
        )
