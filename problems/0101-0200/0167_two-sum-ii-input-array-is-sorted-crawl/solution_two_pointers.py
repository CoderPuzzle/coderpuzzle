class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        while left < right:
            total = numbers[left] + numbers[right]
            if total == target:
                # 1-based indices as the problem expects.
                return [left + 1, right + 1]
            if total < target:
                # Too small: pairing numbers[left] with anything smaller than
                # numbers[right] only lowers the sum — retire the left value.
                left += 1
            else:
                # Too large: retire the right value symmetrically.
                right -= 1
        # Unreachable under the uniqueness promise; keeps the function total.
        return []
