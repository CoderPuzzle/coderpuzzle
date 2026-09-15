from typing import List


class Solution:
    def maximumSumOfHeights(self, heights: List[int]) -> int:
        n = len(heights)

        def ramp_sums(nums: List[int]) -> List[int]:
            # best[i] = heaviest sum of a non-decreasing ramp ending at i
            # with tower i kept at full height. A stack of (height, width)
            # runs holds the clamped prefix; popping taller runs re-stamps
            # those towers at the current, lower height in one multiply.
            best = [0] * len(nums)
            runs: List[List[int]] = []  # [height, width], strictly rising
            total = 0
            for i, h in enumerate(nums):
                width = 1
                while runs and runs[-1][0] >= h:
                    prev_h, prev_w = runs.pop()
                    total -= prev_h * prev_w
                    width += prev_w
                total += h * width
                runs.append([h, width])
                best[i] = total
            return best

        left = ramp_sums(heights)
        right = ramp_sums(heights[::-1])[::-1]
        # Tower i sits in both ramps when it is the peak, so its own height
        # is counted once per direction and must be subtracted back.
        return max(left[i] + right[i] - heights[i] for i in range(n))
