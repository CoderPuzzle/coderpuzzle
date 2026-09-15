class Solution:
    def minimumDistance(self, word: str) -> int:
        # dp[o] = cheapest cost of the typed prefix with the resting finger on
        # letter o (o == 26 models the still-unused finger, distance 0).
        def dist(a: int, b: int) -> int:
            if a == 26 or b == 26:
                return 0
            r1, c1 = divmod(a, 6)
            r2, c2 = divmod(b, 6)
            return abs(r1 - r2) + abs(c1 - c2)

        INF = float("inf")
        dp = [0] * 27  # after typing word[0] the other finger is anywhere, free
        for i in range(1, len(word)):
            prev = ord(word[i - 1]) - ord("A")
            cur = ord(word[i]) - ord("A")
            step = dist(prev, cur)
            nxt = [INF] * 27
            for o, cost in enumerate(dp):
                if cost == INF:
                    continue
                if cost + step < nxt[o]:  # move the finger that just typed
                    nxt[o] = cost + step
                # move the resting finger to cur; prev becomes the new rest
                move = cost + dist(o, cur)
                if move < nxt[prev]:
                    nxt[prev] = move
            dp = nxt
        return min(dp)
