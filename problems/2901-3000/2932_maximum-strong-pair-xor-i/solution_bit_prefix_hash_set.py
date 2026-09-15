from typing import List


class Solution:
    def maximumStrongPairXor(self, nums: List[int]) -> int:
        # Sorting makes the kindred condition one-sided: a partner y of the
        # larger member x must satisfy x <= 2*y, so each x's partners are a
        # window over the earlier sorted values that two pointers maintain.
        nums.sort()
        # counts[level] maps a window value's first (level + 1) bits to how
        # many window values carry that prefix; every value is below 128, so
        # seven bits cover them all, and a value leaving the window just
        # decrements its counts instead of invalidating shared prefixes.
        counts = [{} for _ in range(7)]
        lo = 0
        best = 0
        for i in range(len(nums)):
            x = nums[i]
            while 2 * nums[lo] < x:
                y = nums[lo]
                prefix = 0
                for level in range(7):
                    prefix = prefix * 2 + ((y >> (6 - level)) & 1)
                    counts[level][prefix] -= 1
                    if counts[level][prefix] == 0:
                        del counts[level][prefix]
                lo += 1
            # Greedy walk over x's bits, high to low: keep a bit exactly when
            # the partner prefix that completes it is itself in the window.
            prefix = 0
            ans = 0
            for level in range(7):
                prefix = prefix * 2 + ((x >> (6 - level)) & 1)
                if (prefix ^ (ans * 2 + 1)) in counts[level]:
                    ans = ans * 2 + 1
                else:
                    ans *= 2
            best = max(best, ans)
            # Admit x for the larger values still to come.
            prefix = 0
            for level in range(7):
                prefix = prefix * 2 + ((x >> (6 - level)) & 1)
                counts[level][prefix] = counts[level].get(prefix, 0) + 1
        return best
