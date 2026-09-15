class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        for i in range(len(numbers) - 1):
            complement = target - numbers[i]
            # The sorted remainder numbers[i+1..] is the only legal partner
            # range: a position cannot pair with itself.
            lo, hi = i + 1, len(numbers) - 1
            while lo <= hi:
                mid = (lo + hi) // 2
                if numbers[mid] == complement:
                    # 1-based indices, smaller position first.
                    return [i + 1, mid + 1]
                if numbers[mid] < complement:
                    lo = mid + 1
                else:
                    hi = mid - 1
        # Unreachable under the uniqueness promise; keeps the function total.
        return []
