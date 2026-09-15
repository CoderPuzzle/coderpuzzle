class Solution:
    def numberOfSubstrings(self, s: str, k: int) -> int:
        n = len(s)
        count = [0] * 26
        sat = 0  # number of characters whose window count has reached k
        r = 0
        total = 0
        for l in range(n):
            # Window is [l, r). Extend until some character reaches count k:
            # validity only grows as the window widens, so the first end
            # that works for l also works for every larger end.
            while r < n and sat == 0:
                c = ord(s[r]) - ord("a")
                count[c] += 1
                if count[c] == k:
                    sat += 1
                r += 1
            if sat == 0:
                break  # no window from l (or any later l) can become valid
            # [l, r - 1] is the minimal valid window from l, so exactly the
            # ends r - 1 .. n - 1 are valid: n - (r - 1) substrings.
            total += n - (r - 1)
            c = ord(s[l]) - ord("a")
            if count[c] == k:
                sat -= 1
            count[c] -= 1
        # The answer peaks at n * (n + 1) / 2 <= 4.5e10 for n = 3e5, well
        # below 2 ** 53, so double precision integers represent it exactly.
        return total
