from typing import List


class Solution:
    def minOperations(self, nums1: List[int], nums2: List[int], k: int) -> int:
        # Each operation moves +k units onto one index and -k units off
        # another, so index i needs exactly |diff_i| / k operations pushing
        # it toward its target: every difference must be divisible by k,
        # and the ups must cancel the downs exactly (sum of diffs == 0).
        # Every operation accounts for 2k units of that movement, hence
        # sum(|diff|) / (2k). k == 0 changes nothing per operation, so only
        # arrays that are already equal work. The mass never exceeds
        # n * 10^9 = 10^14 and answers stay <= 5*10^13 < 2^53.
        if k == 0:
            return 0 if nums1 == nums2 else -1
        net = 0
        mass = 0
        for a, b in zip(nums1, nums2):
            diff = b - a
            if abs(diff) % k != 0:
                return -1
            net += diff
            mass += abs(diff)
        # Statement promises n >= 2, so an empty scan cannot happen.
        return -1 if net != 0 else mass // (2 * k)
