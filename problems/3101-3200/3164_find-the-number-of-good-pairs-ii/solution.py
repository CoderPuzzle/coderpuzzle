from typing import List


class Solution:
    def numberOfPairs(self, nums1: List[int], nums2: List[int], k: int) -> int:
        highest = max(nums1)
        counts1 = [0] * (highest + 1)
        for num in nums1:
            counts1[num] += 1
        counts2 = {}
        for num in nums2:
            counts2[num] = counts2.get(num, 0) + 1
        total = 0
        for base, amount in counts2.items():
            step = base * k
            if step > highest:
                continue
            total += amount * sum(counts1[step::step])
        return total
