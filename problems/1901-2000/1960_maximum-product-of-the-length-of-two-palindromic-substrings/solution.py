from typing import List, Optional


class Solution:
    def maxProduct(self, s: str) -> int:
        n = len(s)

        def manacher_odd(s):
            n = len(s)
            d1 = [0] * n
            left, right = 0, -1
            for i in range(n):
                k = 1 if i > right else min(d1[left + right - i], right - i + 1)
                while i - k >= 0 and i + k < n and s[i - k] == s[i + k]:
                    k += 1
                d1[i] = k
                if i + k - 1 > right:
                    left, right = i - k + 1, i + k - 1
            return d1

        d1 = manacher_odd(s)

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
