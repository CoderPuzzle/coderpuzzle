from typing import List


class Solution:
    def smallestUniqueSubarray(self, nums: List[int]) -> int:
        value_counts = {}
        for value in nums:
            value_counts[value] = value_counts.get(value, 0) + 1
        if 1 in value_counts.values():
            return 1
        if len(value_counts) == 1:
            return len(nums)

        base = 100_003
        mod1, mod2 = 10_000_019, 10_000_079
        n = len(nums)
        power1 = [1] * (n + 1)
        power2 = [1] * (n + 1)
        prefix1 = [0] * (n + 1)
        prefix2 = [0] * (n + 1)
        for i, value in enumerate(nums):
            power1[i + 1] = power1[i] * base % mod1
            power2[i + 1] = power2[i] * base % mod2
            prefix1[i + 1] = (prefix1[i] * base + value) % mod1
            prefix2[i + 1] = (prefix2[i] * base + value) % mod2

        def works(length: int) -> bool:
            frequencies = {}
            for start in range(n - length + 1):
                end = start + length
                first = (prefix1[end] - prefix1[start] * power1[length]) % mod1
                second = (prefix2[end] - prefix2[start] * power2[length]) % mod2
                key = (first, second)
                frequencies[key] = frequencies.get(key, 0) + 1
            return 1 in frequencies.values()

        low, high = 1, n
        while low < high:
            middle = (low + high) // 2
            if works(middle):
                high = middle
            else:
                low = middle + 1
        return low
