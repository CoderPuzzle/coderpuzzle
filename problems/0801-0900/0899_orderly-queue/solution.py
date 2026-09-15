class Solution:
    def orderlyQueue(self, s: str, k: int) -> str:
        # A move lifts one of the first k letters to the end. With k = 1
        # the only liftable letter is the very first, so every move is a
        # plain rotation and the answer is the smallest rotation of s:
        # try each cut. With k >= 2 one of the two front letters is never
        # the smallest still waiting, so a non-smallest one can always be
        # parked at the back while the smallest walks forward — every
        # ordering becomes reachable and the answer is the sorted string.
        if k >= 2:
            return "".join(sorted(s))
        best = s
        for i in range(1, len(s)):
            candidate = s[i:] + s[:i]
            if candidate < best:
                best = candidate
        return best
