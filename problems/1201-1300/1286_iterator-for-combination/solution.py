class CombinationIterator:
    """Precompute all combinations via bitmask enumeration, sorted once.

    With n <= 15 there are at most 2^15 masks; a mask is kept when its
    popcount equals the combination length. Ascending mask order groups
    the strings by their highest chosen index rather than by first letter,
    so an explicit sort restores the lexicographic sequence.
    """

    def __init__(self, characters: str, combinationLength: int):
        combos = [
            "".join(ch for i, ch in enumerate(characters) if mask >> i & 1)
            for mask in range(1 << len(characters))
            if mask.bit_count() == combinationLength
        ]
        self.combinations = sorted(combos)
        self.position = 0

    def next(self) -> str:
        combo = self.combinations[self.position]
        self.position += 1
        return combo

    def hasNext(self) -> bool:
        return self.position < len(self.combinations)
