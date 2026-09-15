class Solution:
    def countPalindromes(self, s: str) -> int:
        # A length-5 palindrome has the shape a b c b a. Iterate over each
        # position as the center c: the "ab" pair must sit strictly before
        # it and the "ba" pair strictly after. A suffix table answers the
        # right side for every center in 100 lookups; the left side grows
        # on the fly during the same left-to-right sweep.
        MOD = 10**9 + 7
        n = len(s)
        digits = [ord(c) - 48 for c in s]

        # suff[i][a][b] = number of "ab" subsequences in s[i:]
        suff = [[[0] * 10 for _ in range(10)] for _ in range(n + 1)]
        cnt = [0] * 10  # digit counts in the current suffix s[i:]
        for i in range(n - 1, -1, -1):
            d = digits[i]
            cur, nxt = suff[i], suff[i + 1]
            for a in range(10):
                cur[a] = nxt[a][:]
            for b in range(10):
                cur[d][b] += cnt[b]  # pairs (i, j) whose first char is s[i]
            cnt[d] += 1

        # left[a][b] = number of "ab" subsequences in s[:k]
        left = [[0] * 10 for _ in range(10)]
        lcnt = [0] * 10  # digit counts in s[:k]
        ans = 0
        for k in range(n):
            d = digits[k]
            for a in range(10):
                for b in range(10):
                    ans = (ans + left[a][b] * suff[k + 1][b][a]) % MOD
            for a in range(10):
                left[a][d] += lcnt[a]  # pairs (p, k) whose second char is s[k]
            lcnt[d] += 1
        return ans
