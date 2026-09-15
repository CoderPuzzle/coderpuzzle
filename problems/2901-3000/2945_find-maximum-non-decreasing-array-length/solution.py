from typing import List, Optional


class Solution:
    def findMaximumLength(self, nums: List[int]) -> int:
        # Every reachable array is nums cut into contiguous blocks holding
        # block sums. dp[i] is the most blocks over the first i elements and
        # last[i] the smallest final-block sum among those partitions. A
        # block (j, i] extends partition j when pre[i] - pre[j] >= last[j].
        # dp never decreases (the previous partition survives merging its
        # final block with the new element), so the best predecessor is the
        # rightmost valid one: keep predecessors on a frontier ordered by
        # pre[j] + last[j], pop entries a later index dominates, and
        # binary-search the largest key <= pre[i].
        n = len(nums)
        pre = [0] * (n + 1)
        for i, x in enumerate(nums):
            pre[i + 1] = pre[i] + x
        dp = [0] * (n + 1)
        last = [0] * (n + 1)
        stack = [0]
        keys = [0]
        for i in range(1, n + 1):
            lo, hi = 0, len(keys) - 1
            while lo < hi:
                mid = (lo + hi + 1) // 2
                if keys[mid] <= pre[i]:
                    lo = mid
                else:
                    hi = mid - 1
            j = stack[lo]
            dp[i] = dp[j] + 1
            last[i] = pre[i] - pre[j]
            key = pre[i] + last[i]
            while dp[stack[-1]] <= dp[i] and keys[-1] >= key:
                stack.pop()
                keys.pop()
            stack.append(i)
            keys.append(key)
        return dp[n]
