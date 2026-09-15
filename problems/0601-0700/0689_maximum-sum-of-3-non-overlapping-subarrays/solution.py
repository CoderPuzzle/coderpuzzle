from typing import List


class Solution:
    def maxSumOfThreeSubarrays(self, nums: List[int], k: int) -> List[int]:
        # Fixed length k reduces the search to picking starts: window[s] is
        # the sum of nums[s..s+k), and an answer is a triple (i, j, l) with
        # i + k <= j and j + k <= l maximizing window[i] + window[j] +
        # window[l]. left[s] tracks the largest window over starts [0..s],
        # kept at the SMALLEST index on ties, and right[s] the same over
        # [s..m-1] — each middle j therefore pairs with the lexicographically
        # best flanks available to it.
        n = len(nums)
        m = n - k + 1
        window = [0] * m
        total = sum(nums[:k])
        window[0] = total
        for s in range(1, m):
            total += nums[s + k - 1] - nums[s - 1]
            window[s] = total
        left = [0] * m
        for s in range(1, m):
            left[s] = left[s - 1] if window[left[s - 1]] >= window[s] else s
        right = [0] * m
        right[m - 1] = m - 1
        for s in range(m - 2, -1, -1):
            right[s] = s if window[s] >= window[right[s + 1]] else right[s + 1]
        # Strict improvement only, so the FIRST middle achieving the maximum
        # survives the sweep — which is the lexicographic rule: with j fixed
        # the flanks are independent, and mixing a smaller flank into a
        # smaller middle only ever produces a lexicographically smaller
        # optimum, so the global answer sits at the minimal middle. Every
        # window sum is at least k, so -1 sits below any real total.
        best_total = -1
        best = [0, 0, 0]
        for j in range(k, n - 2 * k + 1):
            i, l = left[j - k], right[j + k]
            total = window[i] + window[j] + window[l]
            if total > best_total:
                best_total = total
                best = [i, j, l]
        return best
