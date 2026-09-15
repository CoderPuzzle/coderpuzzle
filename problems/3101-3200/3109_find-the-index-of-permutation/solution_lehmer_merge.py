class Solution:
    def getPermutationIndex(self, perm: list[int]) -> int:
        MOD = 1_000_000_007
        n = len(perm)
        # fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
        fact = [1] * n
        for i in range(1, n):
            fact[i] = fact[i - 1] * i % MOD

        # Lehmer digit re-read: the values still unused at slot i are exactly
        # the values in later slots, so digit i counts later slots holding
        # smaller values -- a per-position smaller-to-the-right inversion count.
        smaller_after = [0] * n
        # merge-sort workspace of (value, original index) pairs, sorted by value
        order = [(value, i) for i, value in enumerate(perm)]

        def merge_sort(lo, hi):
            """Sort order[lo:hi] by value, tallying smaller-right counts per original index."""
            if hi - lo < 2:
                return
            mid = (lo + hi) // 2
            merge_sort(lo, mid)
            merge_sort(mid, hi)
            left = order[lo:mid]
            i, j, k = 0, mid, lo
            while i < len(left) and j < hi:
                if left[i][0] < order[j][0]:
                    smaller_after[left[i][1]] += j - mid  # right-half values already placed below it
                    order[k] = left[i]
                    i += 1
                else:
                    order[k] = order[j]
                    j += 1
                k += 1
            while i < len(left):
                smaller_after[left[i][1]] += j - mid  # the whole right half sits below it
                order[k] = left[i]
                i += 1
                k += 1

        merge_sort(0, n)

        ans = 0
        for i in range(n):
            # each later smaller value placed at slot i leads (n - 1 - i)! earlier permutations
            ans = (ans + smaller_after[i] * fact[n - 1 - i]) % MOD
        return ans
