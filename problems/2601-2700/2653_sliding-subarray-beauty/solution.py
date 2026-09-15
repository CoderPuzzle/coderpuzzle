from typing import List


class Solution:
    def getSubarrayBeauty(self, nums: List[int], k: int, x: int) -> List[int]:
        # Values are bounded to [-50, 50], so only the 50 negative values
        # can ever be an answer: cnt[v + 50] counts copies of the negative
        # value v inside the current window.
        cnt = [0] * 50
        res: List[int] = []
        for i, v in enumerate(nums):
            if v < 0:
                cnt[v + 50] += 1
            j = i - k
            if j >= 0 and nums[j] < 0:
                cnt[nums[j] + 50] -= 1
            if i >= k - 1:
                # Walk the buckets smallest value first until x negatives
                # have been seen; fewer than x in total means beauty 0.
                rem = x
                beauty = 0
                for d in range(50):
                    c = cnt[d]
                    if c:
                        rem -= c
                        if rem <= 0:
                            beauty = d - 50
                            break
                res.append(beauty)
        return res
