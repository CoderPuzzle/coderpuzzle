from typing import List, Optional


class Solution:
    def countDistinct(self, nums: List[int], k: int, p: int) -> int:
        # dedup by content: tuples hash by value, so equal subarrays collapse
        seen = set()
        n = len(nums)
        for i in range(n):
            # for each left endpoint i, extend j one element at a time, keeping
            # a running count of elements divisible by p
            divisible = 0
            cur = []
            for j in range(i, n):
                if nums[j] % p == 0:
                    divisible += 1
                cur.append(nums[j])
                # over the limit: any longer extension stays over, so stop extending
                if divisible > k:
                    break
                seen.add(tuple(cur))
        return len(seen)
