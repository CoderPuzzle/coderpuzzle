class Solution:
    def minBitwiseArray(self, nums: List[int]) -> List[int]:
        # a OR (a + 1) always ends in a 1 bit, hence odd — the only even
        # prime is 2, which reports -1. For odd x the minimum clears the
        # highest bit of x's trailing run of 1s: its lower neighbors stay 1
        # in a, so a + 1 carries exactly onto the cleared bit and
        # a OR (a + 1) rebuilds x, while clearing any lower bit of the run
        # leaves a larger candidate. The cleared bit is half the lowest set
        # bit of x + 1, since x + 1 zeros the whole run.
        ans = []
        for x in nums:
            if x % 2 == 0:
                ans.append(-1)
            else:
                low = (x + 1) & -(x + 1)
                ans.append(x - (low >> 1))
        return ans
