class Solution:
    def maxProduct(self, s: str) -> int:
        n = len(s)
        a = [ord(c) - 97 for c in s]
        MOD1 = 10**9 + 7
        MOD2 = 10**9 + 9
        BASE = 26

        # Precomputed base powers plus forward and reversed prefix hashes, so
        # any substring palindrome test costs O(1).
        pow1 = [1] * (n + 1)
        pow2 = [1] * (n + 1)
        pre1 = [0] * (n + 1)
        pre2 = [0] * (n + 1)
        rpre1 = [0] * (n + 1)
        rpre2 = [0] * (n + 1)
        for i in range(n):
            pow1[i + 1] = pow1[i] * BASE % MOD1
            pow2[i + 1] = pow2[i] * BASE % MOD2
            pre1[i + 1] = (pre1[i] * BASE + a[i]) % MOD1
            pre2[i + 1] = (pre2[i] * BASE + a[i]) % MOD2
            rpre1[i + 1] = (rpre1[i] * BASE + a[n - 1 - i]) % MOD1
            rpre2[i + 1] = (rpre2[i] * BASE + a[n - 1 - i]) % MOD2

        def is_pal(l, r):
            # s[l..r] is a palindrome iff its forward hash equals the forward
            # hash of the mirrored window in the reversed string; two
            # independent moduli make a false match vanishingly unlikely.
            length = r - l + 1
            f1 = (pre1[r + 1] - pre1[l] * pow1[length]) % MOD1
            g1 = (rpre1[n - l] - rpre1[n - 1 - r] * pow1[length]) % MOD1
            f2 = (pre2[r + 1] - pre2[l] * pow2[length]) % MOD2
            g2 = (rpre2[n - l] - rpre2[n - 1 - r] * pow2[length]) % MOD2
            return f1 == g1 and f2 == g2

        # A palindrome of radius k around c implies one at every smaller
        # radius, so the predicate is monotone: binary-search each center's
        # maximal reach.
        d1 = [0] * n
        for c in range(n):
            lo, hi = 0, min(c, n - 1 - c)
            while lo < hi:
                mid = (lo + hi + 1) // 2
                if is_pal(c - mid, c + mid):
                    lo = mid
                else:
                    hi = mid - 1
            d1[c] = lo + 1

        # Record, per center, the longest odd palindrome that ends exactly
        # at each index and the longest that starts exactly at each index.
        best_end = [0] * n
        best_start = [0] * n
        for c in range(n):
            length = 2 * d1[c] - 1
            end = c + d1[c] - 1
            start = c - d1[c] + 1
            if length > best_end[end]:
                best_end[end] = length
            if length > best_start[start]:
                best_start[start] = length

        # Shrink from the recorded maximum: a palindrome ending at i+1 of length L
        # implies one ending at i of length L-2 (drop one char from each side).
        for i in range(n - 2, -1, -1):
            candidate = best_end[i + 1] - 2
            if candidate > best_end[i]:
                best_end[i] = candidate
        for i in range(1, n):
            candidate = best_start[i - 1] - 2
            if candidate > best_start[i]:
                best_start[i] = candidate

        # Prefix max of best_end / suffix max of best_start = the longest
        # palindrome fully inside each prefix / suffix.
        left = [0] * n
        left[0] = best_end[0]
        for i in range(1, n):
            left[i] = max(left[i - 1], best_end[i])

        right = [0] * n
        right[n - 1] = best_start[n - 1]
        for i in range(n - 2, -1, -1):
            right[i] = max(right[i + 1], best_start[i])

        # The two palindromes are disjoint, so some split separates them;
        # try every split. Single characters are length-1 palindromes, so
        # both sides always contribute at least 1.
        ans = 0
        for i in range(n - 1):
            candidate = left[i] * right[i + 1]
            if candidate > ans:
                ans = candidate
        return ans
