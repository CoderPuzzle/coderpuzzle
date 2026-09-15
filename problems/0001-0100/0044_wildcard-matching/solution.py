class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # Greedy two pointers with one remembered star: every '*' is first
        # matched to the empty run, and a later mismatch backtracks to the
        # most recent star and lets it absorb one more character of s.
        n, m = len(s), len(p)
        si = pi = 0
        star = -1
        restart = 0
        while si < n:
            if pi < m and (p[pi] == "?" or p[pi] == s[si]):
                si += 1
                pi += 1
            elif pi < m and p[pi] == "*":
                # Provisional choice: the star matches nothing yet.
                star = pi
                restart = si
                pi += 1
            elif star != -1:
                # Mismatch after a star: the star absorbs one more character
                # of s, and the pattern replays from just after it.
                restart += 1
                si = restart
                pi = star + 1
            else:
                return False
        # Only trailing stars can still match the empty remainder of s.
        while pi < m and p[pi] == "*":
            pi += 1
        return pi == m
