from typing import List, Optional


class ProductOfNumbers:
    def __init__(self) -> None:
        # prefix[i] = product of the first i numbers since the last zero;
        # prefix[0] = 1 keeps every suffix product a single division.
        self.prefix = [1]

    def add(self, num: int) -> None:
        if num == 0:
            self.prefix = [1]
        else:
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k: int) -> int:
        if k >= len(self.prefix):
            return 0  # the window reaches back past a zero
        return self.prefix[-1] // self.prefix[len(self.prefix) - 1 - k]
