class Allocator:
    def __init__(self, n: int):
        # Flat cell array holding each unit's mID (0 = free). allocate
        # linear-scans runs of free cells for the leftmost fit; freeMemory
        # sweeps the same array once, zeroing every match.
        self.units = [0] * n

    def allocate(self, size: int, mID: int) -> int:
        i = 0
        while i < len(self.units):
            if self.units[i] == 0:
                j = i
                while j < len(self.units) and self.units[j] == 0:
                    j += 1
                if j - i >= size:
                    for k in range(i, i + size):
                        self.units[k] = mID
                    return i
                i = j
            else:
                i += 1
        return -1

    def freeMemory(self, mID: int) -> int:
        freed = 0
        for k in range(len(self.units)):
            if self.units[k] == mID:
                self.units[k] = 0
                freed += 1
        return freed


# Your Allocator object will be instantiated and called as such:
# obj = Allocator(n)
# param_1 = obj.allocate(size, mID)
# param_2 = obj.freeMemory(mID)
