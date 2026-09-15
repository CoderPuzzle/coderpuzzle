class Solution:
    def numberOfSets(self, n: int, k: int) -> int:
        # Sort the k segments by left endpoint: l_1 < r_1, l_2 < r_2, ...,
        # l_k < r_k, with r_i <= l_(i+1) (equality allowed, since segments
        # may touch at a shared endpoint but not overlap). Shift the i-th
        # pair by (i - 1): a_i = l_i + (i - 1), b_i = r_i + (i - 1). Each
        # within-segment inequality l_i < r_i stays strict after an equal
        # shift, and each between-segment inequality r_i <= l_(i+1) becomes
        # b_i = r_i + (i - 1) < l_(i+1) + i = a_(i+1), now strict too. So
        # (a_1, b_1, ..., a_k, b_k) is a strictly increasing sequence of 2k
        # integers drawn from [0, n - 1 + (k - 1)], a range of n + k - 1
        # values, and this shift is a bijection onto strictly increasing
        # sequences there. Choosing which 2k of those n + k - 1 values
        # appear determines the whole set, so the answer is C(n + k - 1,
        # 2k).
        mod = 1_000_000_007
        total = n + k - 1
        pick = 2 * k
        fact = [1] * (total + 1)
        for i in range(1, total + 1):
            fact[i] = fact[i - 1] * i % mod
        inv_pick = pow(fact[pick], mod - 2, mod)
        inv_rest = pow(fact[total - pick], mod - 2, mod)
        return fact[total] * inv_pick % mod * inv_rest % mod
