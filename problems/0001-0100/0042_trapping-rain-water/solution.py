from typing import List, Optional


class Solution:
    def trap(self, height: List[int]) -> int:
        # Water above bar i is min(tallest to its left, tallest to its right)
        # minus height[i]; two converging pointers derive both maxima on the
        # fly instead of precomputing two running-max arrays.
        left, right = 0, len(height) - 1
        left_max = right_max = 0
        water = 0
        # left < right retires one index per step and never processes the
        # meeting index twice (the global maximum traps nothing anyway).
        while left < right:
            # Process the smaller side: the right side holds a bar at least
            # height[right] tall, hence taller than height[left], so the water
            # at left is decided entirely by left_max.
            if height[left] < height[right]:
                # A bar that sets a new left_max traps nothing; below it, the
                # trapped depth is exactly left_max - height[left].
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    water += left_max - height[left]
                left += 1
            else:
                # Symmetric argument on the right side.
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    water += right_max - height[right]
                right -= 1
        return water
