from typing import List


class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        # lengths[i] / counts[i]: the longest strictly increasing subsequence
        # ending at i, and how many of that length end there. A longer
        # predecessor (nums[j] < nums[i]) resets the count to counts[j], an
        # equally long one adds to it, so each i finishes with the total over
        # its best arrivals. Python ints never overflow, so the running
        # counts are safe as-is.
        n = len(nums)
        lengths = [1] * n
        counts = [1] * n
        best = 0
        answer = 0
        for i in range(n):
            x = nums[i]
            for j in range(i):
                if nums[j] < x:
                    candidate = lengths[j] + 1
                    if candidate > lengths[i]:
                        lengths[i] = candidate
                        counts[i] = counts[j]
                    elif candidate == lengths[i]:
                        counts[i] += counts[j]
            if lengths[i] > best:
                best, answer = lengths[i], counts[i]
            elif lengths[i] == best:
                answer += counts[i]
        return answer
