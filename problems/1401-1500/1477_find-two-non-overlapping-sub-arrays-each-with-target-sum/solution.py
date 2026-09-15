from typing import List

INF = float("inf")


class Solution:
    def minSumOfLengths(self, arr: List[int], target: int) -> int:
        n = len(arr)
        best = [INF] * n  # best[i]: shortest target-window ending <= i
        answer = INF
        best_so_far = INF
        window_sum = 0
        left = 0
        for right in range(n):
            window_sum += arr[right]
            while window_sum > target:
                window_sum -= arr[left]
                left += 1
            if window_sum == target:
                length = right - left + 1
                if left > 0 and best[left - 1] != INF:
                    answer = min(answer, best[left - 1] + length)
                best_so_far = min(best_so_far, length)
            best[right] = best_so_far
        return -1 if answer == INF else answer
