import random


class Solution:
    """Walker alias table: n columns of height total, index i's own material
    filling w[i] * n of its column and a donor's topping up the rest;
    one uniform cell of the n * total grid lands on index i's material with
    probability exactly w[i] / total."""

    def __init__(self, w: list[int]) -> None:
        n = len(w)
        total = sum(w)
        self.n = n
        self.total = total
        self.height = [weight * n for weight in w]
        self.alias = [0] * n
        small = [c for c in range(n) if self.height[c] < total]
        large = [c for c in range(n) if self.height[c] >= total]
        while small and large:
            under = small.pop()
            over = large.pop()
            self.alias[under] = over
            self.height[over] -= total - self.height[under]
            if self.height[over] < total:
                small.append(over)
            elif self.height[over] > total:
                large.append(over)

    def pickIndex(self) -> int:
        cell = random.randrange(self.n * self.total)
        column = cell % self.n
        return column if cell // self.n < self.height[column] else self.alias[column]
