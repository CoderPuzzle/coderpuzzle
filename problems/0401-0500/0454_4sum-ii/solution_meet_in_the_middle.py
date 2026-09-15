class Solution:
    def fourSumCount(self, nums1: list[int], nums2: list[int], nums3: list[int], nums4: list[int]) -> int:
        # Meet in the middle: a+b+c+d = 0 iff a+b = -(c+d), so index the
        # nums1 two arrays' pair sums with multiplicities (not a set).
        sums = {}
        for a in nums1:
            for b in nums2:
                key = a + b
                sums[key] = sums.get(key, 0) + 1
        total = 0
        # Each (c,d) pair adds the number of (a,b) pairs summing to its
        # negation; every zero tuple is counted once via its unique split.
        for c in nums3:
            for d in nums4:
                total += sums.get(-(c + d), 0)
        return total
