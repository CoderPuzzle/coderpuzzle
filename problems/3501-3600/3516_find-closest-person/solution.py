class Solution:
    def findClosest(self, x: int, y: int, z: int) -> int:
        # Same speed means arrival order is just distance order, so compare
        # the two absolute distances to the stationary Person 3.
        dx, dy = abs(x - z), abs(y - z)
        if dx < dy:
            return 1
        if dy < dx:
            return 2
        return 0
