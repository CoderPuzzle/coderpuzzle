from typing import List, Optional


class Solution:
    def minMaxSubarraySum(self, nums: List[int], k: int) -> int:
        def _count_pairs(A, B, K):
            """Number of (a, b) with 0<=a<=A, 0<=b<=B, a+b<=K."""
            if K < 0 or A < 0 or B < 0:
                return 0
            A = min(A, K)
            B = min(B, K)
            if A + B <= K:
                return (A + 1) * (B + 1)
            t = K - B
            total = 0
            if t >= 0:
                total += (min(A, t) + 1) * (B + 1)
            lo = max(0, t + 1)
            if lo <= A:
                m = A - lo + 1
                total += m * (K + 1) - (lo + A) * m // 2
            return total

        n = len(nums)
        K = k - 1

        L_max = [0] * n
        R_max = [0] * n
        stack = []
        for i in range(n):
            while stack and nums[stack[-1]] <= nums[i]:
                stack.pop()
            L_max[i] = i - stack[-1] - 1 if stack else i
            stack.append(i)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] < nums[i]:
                stack.pop()
            R_max[i] = stack[-1] - i - 1 if stack else n - 1 - i
            stack.append(i)

        L_min = [0] * n
        R_min = [0] * n
        stack = []
        for i in range(n):
            while stack and nums[stack[-1]] >= nums[i]:
                stack.pop()
            L_min[i] = i - stack[-1] - 1 if stack else i
            stack.append(i)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] > nums[i]:
                stack.pop()
            R_min[i] = stack[-1] - i - 1 if stack else n - 1 - i
            stack.append(i)

        answer = 0
        for i in range(n):
            cnt = _count_pairs(L_max[i], R_max[i], K) + _count_pairs(L_min[i], R_min[i], K)
            answer += nums[i] * cnt
        return answer
