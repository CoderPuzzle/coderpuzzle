from typing import List


class Solution:
    def countBeautifulPairs(self, nums: List[int]) -> int:
        # A pair is beautiful iff the first digit of nums[i] and the last
        # digit of nums[j] are coprime; n <= 100, so test every pair.
        def gcd(a: int, b: int) -> int:
            while b:
                a, b = b, a % b
            return a

        count = 0
        for i in range(len(nums)):
            # Leading digit of nums[i] straight from its decimal string.
            first = int(str(nums[i])[0])
            for j in range(i + 1, len(nums)):
                # Last digit is nonzero by the constraints, and gcd(1, d)
                # == 1 makes every pair with a first digit of 1 beautiful,
                # including two 1s.
                if gcd(first, nums[j] % 10) == 1:
                    count += 1
        return count
