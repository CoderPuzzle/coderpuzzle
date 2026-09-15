from typing import List


class Solution:
    def minSubarray(self, nums: List[int], p: int) -> int:
        # target is the remainder the removed subarray's own sum must
        # leave; if the whole array already clears it, remove nothing.
        n = len(nums)
        target = sum(nums) % p
        if target == 0:
            return 0

        # Map each running prefix remainder to its most recent index,
        # seeded with the empty prefix (remainder 0 at index -1).
        last_index = {0: -1}
        running = 0
        best = n
        for index, value in enumerate(nums):
            running = (running + value) % p
            needed = (running - target) % p
            earlier = last_index.get(needed)
            # A match spanning the full array (earlier == -1 at the last
            # index) would remove everything, which is disallowed — cap
            # the span below n to reject exactly that one case.
            if earlier is not None:
                span = index - earlier
                if span < n and span < best:
                    best = span
            last_index[running] = index

        return best if best < n else -1
