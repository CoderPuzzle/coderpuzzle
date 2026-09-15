class Solution:
    def minBitwiseArray(self, nums: List[int]) -> List[int]:
        # a OR (a + 1) >= a + 1, so any solution for x satisfies a <= x - 1;
        # scanning candidates from 0 up, the first hit is the minimum. The
        # value a OR (a + 1) always ends in a 1 bit, hence odd, and the only
        # even prime is 2 — that entry scans to no candidate and reports -1.
        ans = []
        for x in nums:
            for a in range(x):
                if (a | (a + 1)) == x:
                    ans.append(a)
                    break
            else:
                ans.append(-1)
        return ans
