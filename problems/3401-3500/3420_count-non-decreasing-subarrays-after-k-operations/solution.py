from typing import List, Optional


class Solution:
    def countNonDecreasingSubarrays(self, nums: List[int], k: int) -> int:
        result = 0
        cnt = 0
        dq = []
        head = 0  # front index into dq
        right = len(nums) - 1
        for left in range(len(nums) - 1, -1, -1):
            # Merge stack segments: raise smaller elements to nums[left].
            while head < len(dq) and nums[dq[-1]] < nums[left]:
                l = dq.pop()
                r = dq[-1] - 1 if head < len(dq) else right
                cnt += (r - l + 1) * (nums[left] - nums[l])
            dq.append(left)
            # Shrink the window from the right if the cost exceeds k.
            while cnt > k:
                cnt -= nums[dq[head]] - nums[right]
                if dq[head] == right:
                    head += 1
                right -= 1
            result += right - left + 1
        return result
