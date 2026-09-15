class Bitset:
    """A bit array plus a lazy orientation flag. The stored byte always
    means "effective bit XOR flag", so fix/unfix complement their write
    while the set is flipped, flip() only toggles the flag and re-derives
    ones as size - ones, and all/one/count just read the counter.
    toString is the one place every bit passes through the flag again.
    """

    def __init__(self, size: int):
        self.bits = [0] * size
        self.flipped = 0
        self.ones = 0

    def fix(self, idx: int):
        if self.bits[idx] ^ self.flipped == 0:
            self.bits[idx] = 1 - self.flipped
            self.ones += 1

    def unfix(self, idx: int):
        if self.bits[idx] ^ self.flipped == 1:
            self.bits[idx] = self.flipped
            self.ones -= 1

    def flip(self):
        self.flipped ^= 1
        self.ones = len(self.bits) - self.ones

    def all(self) -> bool:
        return self.ones == len(self.bits)

    def one(self) -> bool:
        return self.ones > 0

    def count(self) -> int:
        return self.ones

    def toString(self) -> str:
        return "".join(str(bit ^ self.flipped) for bit in self.bits)
