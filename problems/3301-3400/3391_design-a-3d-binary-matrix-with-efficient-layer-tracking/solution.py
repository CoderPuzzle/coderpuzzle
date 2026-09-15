import heapq


class Matrix3D:
    """Layer one-counts live in an array beside a max-heap of
    (count, x) pairs; every count change pushes a fresh pair, so the
    top always holds the largest live count with ties broken toward the
    larger index, and pairs left stale by later changes are discarded
    only when they surface at the top. The cell grid answers set and
    unset in O(1) and keeps repeated sets or unsets from skewing the
    counts. Each call costs O(log) heap work."""

    def __init__(self, n: int):
        self.n = n
        self.counts = [0] * n
        self.cells = [bytearray(n * n) for _ in range(n)]
        # Min-heap on (-count, -x): the top is the largest count, ties
        # broken toward the largest index.
        self.heap = [(0, -x) for x in range(n)]
        heapq.heapify(self.heap)

    def setCell(self, x: int, y: int, z: int) -> None:
        row = self.cells[x]
        if row[y * self.n + z]:
            return
        row[y * self.n + z] = 1
        self.counts[x] += 1
        heapq.heappush(self.heap, (-self.counts[x], -x))

    def unsetCell(self, x: int, y: int, z: int) -> None:
        row = self.cells[x]
        if not row[y * self.n + z]:
            return
        row[y * self.n + z] = 0
        self.counts[x] -= 1
        heapq.heappush(self.heap, (-self.counts[x], -x))

    def largestMatrix(self) -> int:
        heap = self.heap
        counts = self.counts
        # The live pair of the true maximum is always present, so the
        # stale entries above it run out.
        while -heap[0][0] != counts[-heap[0][1]]:
            heapq.heappop(heap)
        return -heap[0][1]
