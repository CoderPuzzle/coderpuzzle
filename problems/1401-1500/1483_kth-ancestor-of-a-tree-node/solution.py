from typing import List


class TreeAncestor:
    """Binary lifting: up[j][v] is the 2^j-th ancestor of v, or -1.

    Doubling turns every query into the binary expansion of k — one table
    lookup per set bit, so at most ⌈log₂ n⌉ jumps.
    """

    def __init__(self, n: int, parent: List[int]) -> None:
        # 2^levels > n >= k, so every k fits in `levels` bits.
        self.levels = max(1, n.bit_length())
        self.up: List[List[int]] = [list(parent)]
        for _ in range(1, self.levels):
            previous = self.up[-1]
            # A 2^j jump is two 2^(j-1) jumps; -1 absorbs everything above
            # the root.
            self.up.append([-1 if v < 0 else previous[v] for v in previous])

    def getKthAncestor(self, node: int, k: int) -> int:
        if k >= 1 << self.levels:
            return -1
        level = 0
        while k and node >= 0:
            if k & 1:
                node = self.up[level][node]
            k >>= 1
            level += 1
        return node
