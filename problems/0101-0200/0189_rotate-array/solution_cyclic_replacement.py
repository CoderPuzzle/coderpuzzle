from math import gcd
from typing import List


class Solution:
    def rotate(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        # A rotation by n steps is the identity, so any larger k wraps
        # around to k % n — normalize before chasing cycles.
        k %= n

        # The positions split into gcd(n, k) cycles under i -> (i + k) % n,
        # and walking each cycle carries its values straight to their final
        # slots with only one element in flight at a time.
        cycles = gcd(n, k)
        for start in range(cycles):
            carried = nums[start]
            j = start
            while True:
                # Drop the carried element into its rightful slot and catch
                # the one displaced; the cycle closes back at the start.
                nxt = (j + k) % n
                nums[nxt], carried = carried, nums[nxt]
                j = nxt
                if nxt == start:
                    break

        # The rotation happened inside the input allocation; the same array,
        # now rotated, is what the judge compares.
        return nums
