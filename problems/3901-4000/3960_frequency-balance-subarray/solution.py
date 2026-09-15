from typing import List


class Solution:
    def getLength(self, nums: List[int]) -> int:
        n = len(nums)
        best = 1
        for left in range(n):
            counts = {}
            frequency_groups = [0] * (n + 1)
            level_count = 0
            level_sum = 0
            level_square_sum = 0

            for right in range(left, n):
                value = nums[right]
                old_frequency = counts.get(value, 0)
                if old_frequency > 0:
                    frequency_groups[old_frequency] -= 1
                    if frequency_groups[old_frequency] == 0:
                        level_count -= 1
                        level_sum -= old_frequency
                        level_square_sum -= old_frequency * old_frequency

                new_frequency = old_frequency + 1
                if frequency_groups[new_frequency] == 0:
                    level_count += 1
                    level_sum += new_frequency
                    level_square_sum += new_frequency * new_frequency
                frequency_groups[new_frequency] += 1
                counts[value] = new_frequency

                balanced = len(counts) == 1
                if level_count == 2 and level_sum % 3 == 0:
                    lower = level_sum // 3
                    balanced = level_square_sum == 5 * lower * lower
                if balanced:
                    best = max(best, right - left + 1)

        return best
