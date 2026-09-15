import random


class RandomizedSet:
    """Hash map from value -> index, plus a values array. remove swaps the
    victim with the last element and pops, so insert/remove/getRandom are
    all O(1); getRandom draws uniformly from the live values."""

    def __init__(self) -> None:
        self.values: list[int] = []
        self.index: dict[int, int] = {}

    def insert(self, val: int) -> bool:
        if val in self.index:
            return False
        self.index[val] = len(self.values)
        self.values.append(val)
        return True

    def remove(self, val: int) -> bool:
        slot = self.index.pop(val, None)
        if slot is None:
            return False
        last = len(self.values) - 1
        if slot != last:
            moved = self.values[last]
            self.values[slot] = moved
            self.index[moved] = slot
        self.values.pop()
        return True

    def getRandom(self) -> int:
        return self.values[random.randrange(len(self.values))]
