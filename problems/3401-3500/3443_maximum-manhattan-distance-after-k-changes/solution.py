class Solution:
    def maxDistance(self, s: str, k: int) -> int:
        # Manhattan distance is the max of sx*x + sy*y over the four
        # quadrant signings, and every step contributes +/-1 to that
        # signing. Flipping a misaligned step to an aligned one buys +2,
        # so the best reachable value at each prefix is cur + 2*min(k, mis).
        best = 0
        for sx, sy in ((1, 1), (1, -1), (-1, 1), (-1, -1)):
            cur = mis = 0
            for c in s:
                if c == "N":
                    step = sy
                elif c == "S":
                    step = -sy
                elif c == "E":
                    step = sx
                else:
                    step = -sx
                cur += step
                if step < 0:
                    mis += 1
                best = max(best, cur + 2 * min(k, mis))
        return best
