class Solution:
    def largestEvenSum(self, nums: list[int], k: int) -> int:
        values = sorted(nums, reverse=True)
        total = sum(values[:k])
        if total % 2 == 0:
            return total

        smallest_selected = [None, None]
        for value in values[:k]:
            smallest_selected[value % 2] = value

        largest_unselected = [None, None]
        for value in values[k:]:
            parity = value % 2
            if largest_unselected[parity] is None:
                largest_unselected[parity] = value

        candidates = []
        for parity in (0, 1):
            if smallest_selected[parity] is not None and largest_unselected[1 - parity] is not None:
                candidates.append(total - smallest_selected[parity] + largest_unselected[1 - parity])
        return max(candidates, default=-1)
