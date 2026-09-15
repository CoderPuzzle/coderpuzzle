class Solution:
    def findMaxK(self, nums: List[int]) -> int:
        # A positive k is valid exactly when -k sits in the same array, so
        # membership is the whole question -- drop every value into a hash
        # set once, then scan for the largest positive whose negation is
        # present. Values are nonzero by the constraints, so no value can
        # be its own partner.
        seen = set(nums)
        best = -1
        for value in nums:
            if value > 0 and -value in seen and value > best:
                best = value
        return best
