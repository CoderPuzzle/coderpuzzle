class Solution:
    def distinctPoints(self, s: str, k: int) -> int:
        # Moves add like vectors, so the endpoint left after deleting a
        # window is the full-walk endpoint minus the window's own
        # displacement — only window sums matter, never the re-walk.
        dx = {"U": 0, "D": 0, "L": -1, "R": 1}
        dy = {"U": 1, "D": -1, "L": 0, "R": 0}
        tx = sum(dx[c] for c in s)
        ty = sum(dy[c] for c in s)
        # Slide the length-k window, updating its displacement in O(1) per
        # step — drop the outgoing move, pick up the incoming one — and
        # collect the endpoint every deletion produces.
        wx = sum(dx[c] for c in s[:k])
        wy = sum(dy[c] for c in s[:k])
        seen = set()
        for i in range(len(s) - k):
            seen.add((tx - wx, ty - wy))
            out, inc = s[i], s[i + k]
            wx += dx[inc] - dx[out]
            wy += dy[inc] - dy[out]
        seen.add((tx - wx, ty - wy))
        return len(seen)
