from typing import List


class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        # Extended Boyer-Moore voting: two candidate slots, two counters. A
        # match raises its slot's counter, a zero counter adopts the current
        # value, and a value matching neither slot spends both counters.
        candidate1, count1 = 0, 0
        candidate2, count2 = 0, 0
        for value in nums:
            if value == candidate1:
                count1 += 1
            elif value == candidate2:
                count2 += 1
            elif count1 == 0:
                candidate1, count1 = value, 1
            elif count2 == 0:
                candidate2, count2 = value, 1
            else:
                count1 -= 1
                count2 -= 1
        # The vote only nominates; a verification pass counts each nominee's
        # real occurrences and keeps only those above the n // 3 threshold.
        threshold = len(nums) // 3
        total1, total2 = 0, 0
        for value in nums:
            if value == candidate1:
                total1 += 1
            elif value == candidate2:
                total2 += 1
        result = []
        if total1 > threshold:
            result.append(candidate1)
        if candidate2 != candidate1 and total2 > threshold:
            result.append(candidate2)
        # At most two answers survive; sorting pins the ascending order the
        # examples show.
        return sorted(result)
