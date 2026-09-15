from math import isqrt


class MRUQueue:
    """The queue lives in consecutive blocks of about sqrt(n) slots: fetch walks
    the blocks, subtracting each size from k, to find the kth element, lifts it
    out of its own block, and re-appends it at the tail — an empty block is
    dropped, a full tail rolls the value into a fresh block.
    """

    def __init__(self, n: int):
        self.width = isqrt(n) + 1
        self.blocks = [list(range(start, min(start + self.width, n + 1))) for start in range(1, n + 1, self.width)]

    def fetch(self, k: int) -> int:
        index = 0
        while k > len(self.blocks[index]):
            k -= len(self.blocks[index])
            index += 1
        value = self.blocks[index].pop(k - 1)
        if not self.blocks[index]:
            del self.blocks[index]
        if not self.blocks or len(self.blocks[-1]) >= self.width:
            self.blocks.append([value])
        else:
            self.blocks[-1].append(value)
        return value
