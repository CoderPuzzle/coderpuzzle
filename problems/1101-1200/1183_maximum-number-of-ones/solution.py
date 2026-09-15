class Solution:
    def maximumNumberOfOnes(self, width: int, height: int, sideLength: int, maxOnes: int) -> int:
        # Each residue class (r, c) mod sideLength appears in every window
        # exactly once, so the constraint binds classes. Count how many
        # grid cells fall into each class: full blocks plus the leftover
        # strip when the remainder reaches r (or c).
        counts = []
        for r in range(sideLength):
            for c in range(sideLength):
                rows = height // sideLength + (1 if height % sideLength > r else 0)
                cols = width // sideLength + (1 if width % sideLength > c else 0)
                counts.append(rows * cols)
        counts.sort(reverse=True)
        return sum(counts[:maxOnes])
