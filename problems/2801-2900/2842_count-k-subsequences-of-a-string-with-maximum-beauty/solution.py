class Solution:
    def countKSubsequencesWithMaxBeauty(self, s: str, k: int) -> int:
        MOD = 10**9 + 7

        def comb(n: int, r: int) -> int:
            # Exact: groups hold at most the 26 letters, so n <= 26 and the
            # running value never exceeds C(26, 13) = 10400600.
            r = min(r, n - r)
            out = 1
            for t in range(1, r + 1):
                out = out * (n - r + t) // t
            return out

        def pow_mod(x: int, e: int) -> int:
            out, base = 1, x
            while e:
                if e & 1:
                    out = out * base % MOD
                base = base * base % MOD
                e >>= 1
            return out

        # f(c) per letter; letters absent from s drop out of the pool.
        freq = [0] * 26
        for ch in s:
            freq[ord(ch) - ord("a")] += 1
        counts = sorted((f for f in freq if f), reverse=True)
        # Fewer than k distinct characters: no k-subsequence exists at all.
        if k > len(counts):
            return 0
        # The maximum beauty takes the top-k frequencies. Whole equal-count
        # groups are consumed until one group gets split; the split choice
        # contributes C(group, take) letter sets, and each chosen letter
        # multiplies the index choices by its frequency, i.e. x^take for the
        # whole group.
        ans, rem, i = 1, k, 0
        while rem:
            j = i
            while j < len(counts) and counts[j] == counts[i]:
                j += 1
            take = min(rem, j - i)
            ans = ans * comb(j - i, take) % MOD
            ans = ans * pow_mod(counts[i], take) % MOD
            rem -= take
            i = j
        return ans
