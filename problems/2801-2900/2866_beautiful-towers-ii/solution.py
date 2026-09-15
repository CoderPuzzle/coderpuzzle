from typing import List


class Solution:
    def maximumSumOfHeights(self, maxHeights: List[int]) -> int:
        # One monotonic-index sweep per side: popping every strictly taller
        # index before i leaves j, the nearest index with
        # maxHeights[j] <= maxHeights[i]; towers j+1..i clip to the peak
        # height while the prefix up to j keeps its own best mountain, so
        # left[i] = left[j] + maxHeights[i] * (i - j). Sums reach
        # n * max(maxHeights[i]) = 10^5 * 10^9 = 10^14, so Python's big
        # integers stay exact throughout.
        n = len(maxHeights)
        left = [0] * n
        stack = []
        for i, h in enumerate(maxHeights):
            while stack and maxHeights[stack[-1]] > h:
                stack.pop()
            if stack:
                j = stack[-1]
                left[i] = left[j] + h * (i - j)
            else:
                left[i] = h * (i + 1)
            stack.append(i)
        right = [0] * n
        stack = []
        for i in range(n - 1, -1, -1):
            h = maxHeights[i]
            while stack and maxHeights[stack[-1]] > h:
                stack.pop()
            if stack:
                j = stack[-1]
                right[i] = right[j] + h * (j - i)
            else:
                right[i] = h * (n - i)
            stack.append(i)
        return max(l + r - h for l, r, h in zip(left, right, maxHeights))
