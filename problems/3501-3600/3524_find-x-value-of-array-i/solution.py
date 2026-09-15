from typing import List


class Solution:
    def resultArray(self, nums: List[int], k: int) -> List[int]:
        # Removing a prefix and a suffix is the same as choosing the non-empty
        # contiguous middle that survives, so result[x] counts subarrays whose
        # product is x mod k. The running DP extends every subarray ending at
        # the previous element by nums[i] and adds the singleton [i]. Counts
        # reach n*(n+1)/2 = 5,000,050,000 for n = 10^5 — beyond 32 bits — and
        # r * nums[i] reaches 4 * 10^9, so both live in 64-bit integers.
        counts = [0] * k
        result = [0] * k
        for num in nums:
            extended = [0] * k
            for r in range(k):
                if counts[r]:
                    extended[r * num % k] += counts[r]
            extended[num % k] += 1
            for r in range(k):
                result[r] += extended[r]
            counts = extended
        return result
