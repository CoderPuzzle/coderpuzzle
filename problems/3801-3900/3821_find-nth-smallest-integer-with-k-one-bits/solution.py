class Solution:
    def nthSmallest(self, n: int, k: int) -> int:
        # Numbers with exactly k one bits and bit length exactly L are
        # C(L-1, k-1): a leading 1 plus k-1 ones among L-1 free slots, so
        # hockey-sticking over shorter lengths, C(L, k) candidates have
        # length <= L. Grow L until rank n fits, then unrank the rest
        # MSB -> LSB: placing 0 at position p leaves C(p, need) smaller
        # completions, so set the bit whenever the leftover rank exceeds
        # that block. Every binomial tops out at C(50, 25) ~ 1.26e14 and
        # the answer below 2^50 -- Python ints make both a non-issue.
        C = [[0] * 51 for _ in range(51)]
        for i in range(51):
            C[i][0] = 1
            for j in range(1, i + 1):
                C[i][j] = C[i - 1][j - 1] + C[i - 1][j]
        length = k
        while C[length][k] < n:
            length += 1
        r = n - C[length - 1][k]
        ans = 1 << (length - 1)
        need = k - 1
        for p in range(length - 2, -1, -1):
            if r > C[p][need]:
                r -= C[p][need]
                ans |= 1 << p
                need -= 1
        return ans
