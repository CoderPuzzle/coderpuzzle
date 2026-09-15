from typing import Dict


class TwoSum:
    """Hash multiset of the added numbers — counts, not positions.

    `add` bumps a counter in constant time; `find` lazily scans the
    distinct values once, asking the multiset for each complement.
    """

    def __init__(self) -> None:
        self.counts: Dict[int, int] = {}

    def add(self, number: int) -> None:
        self.counts[number] = self.counts.get(number, 0) + 1

    def find(self, value: int) -> bool:
        for number, count in self.counts.items():
            complement = value - number
            # A value that is its own complement needs two stored copies.
            if complement in self.counts and (complement != number or count > 1):
                return True
        return False
