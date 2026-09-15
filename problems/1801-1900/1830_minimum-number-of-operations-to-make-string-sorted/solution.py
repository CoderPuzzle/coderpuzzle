class Solution:
    def makeStringSorted(self, s: str) -> int:
        # Each operation steps s to its previous lexicographic permutation,
        # so the operation count is the number of distinct permutations of
        # the multiset that are strictly smaller than s. That rank minus one
        # splits per position: with rem slots after i, any remaining letter
        # smaller than s[i] can lead them in rem! / prod(cnt!) arrangements —
        # cnt of the chosen letter one lower. Keeping den = prod(1/cnt!)
        # incrementally folds the multinomial into one multiply per step:
        # the summed contribution is fact[rem] * den * sum(smaller counts),
        # and placing s[i] itself multiplies den by its pre-placement count.
        MOD = 1_000_000_007
        n = len(s)
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i - 1] * i % MOD
        inv_fact = [1] * (n + 1)
        inv_fact[n] = pow(fact[n], MOD - 2, MOD)
        for i in range(n, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % MOD
        cnt = [0] * 26
        for ch in s:
            cnt[ord(ch) - 97] += 1
        den = 1
        for k in range(26):
            den = den * inv_fact[cnt[k]] % MOD
        ans = 0
        for i, ch in enumerate(s):
            c = ord(ch) - 97
            smaller = sum(cnt[:c])
            ans = (ans + fact[n - 1 - i] * den % MOD * smaller) % MOD
            den = den * cnt[c] % MOD
            cnt[c] -= 1
        return ans
