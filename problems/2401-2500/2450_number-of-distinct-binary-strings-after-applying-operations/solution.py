class Solution:
    def countDistinctStrings(self, s: str, k: int) -> int:
        # Only the number of size-k windows matters: e = n - k + 1. Flipping
        # a window is an independent yes/no choice and each combination gives
        # a distinct string (hint 2), so the answer is 2^e mod 1e9+7.
        MOD = 1_000_000_007
        e = len(s) - k + 1
        base, res = 2, 1
        while e:
            if e & 1:
                res = res * base % MOD
            base = base * base % MOD
            e >>= 1
        return res
