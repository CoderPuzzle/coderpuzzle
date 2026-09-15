from bisect import bisect_left, insort


class RandomizedCollection:
    """Hash map from value -> sorted list of indices, plus a values array.

    Deterministic variant: remove deletes the leftmost occurrence and moves
    the last element into the vacated slot; getRandom returns values[0].
    """

    def __init__(self) -> None:
        self.values: list[int] = []
        self.indices: dict[int, list[int]] = {}

    def insert(self, val: int) -> bool:
        positions = self.indices.get(val)
        present = positions is not None
        self.values.append(val)
        index = len(self.values) - 1  # new index is always the maximum
        if present:
            insort(positions, index)
        else:
            self.indices[val] = [index]
        return not present

    def remove(self, val: int) -> bool:
        positions = self.indices.get(val)
        if not positions:
            return False
        index = positions[0]  # leftmost occurrence
        last = len(self.values) - 1
        if self.values[last] == val:
            # The moved element equals the removed one: a copy stays at
            # `index`, so only the last index leaves the set.
            del positions[bisect_left(positions, last)]
        else:
            moved = self.values[last]
            self.values[index] = moved
            others = self.indices[moved]
            del others[bisect_left(others, last)]
            insort(others, index)
            del positions[0]
        self.values.pop()
        if not positions:
            del self.indices[val]
        return True

    def getRandom(self) -> int:
        return self.values[0]
