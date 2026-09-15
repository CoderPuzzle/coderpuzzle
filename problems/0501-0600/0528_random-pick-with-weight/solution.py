import random
from bisect import bisect_left


class Solution:
    """Prefix sums lay the weights end to end over [0, total); one uniform
    draw lands in exactly one segment, so index i comes back with
    probability exactly w[i] / total."""

    def __init__(self, w: list[int]) -> None:
        self.prefix = [0] * (len(w) + 1)
        for i, weight in enumerate(w):
            self.prefix[i + 1] = self.prefix[i] + weight

    def pickIndex(self) -> int:  # noqa: N802 — LeetCode API
        target = random.randrange(1, self.prefix[-1] + 1)
        return bisect_left(self.prefix, target) - 1
