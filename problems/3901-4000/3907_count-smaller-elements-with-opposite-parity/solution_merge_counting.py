from typing import List


class Solution:
    def countSmallerOppositeParity(self, nums: List[int]) -> List[int]:
        n = len(nums)
        result = [0] * n  # per index: smaller opposite-parity values to its right
        order = list(range(n))  # merge-sort workspace of indexes, ordered by value

        def merge_sort(lo, hi):
            """Sort order[lo:hi] by value, tallying smaller opposite-parity right-half values."""
            if hi - lo < 2:
                return
            mid = (lo + hi) // 2
            merge_sort(lo, mid)
            merge_sort(mid, hi)
            left = order[lo:mid]
            placed = [0, 0]  # placed right-half values, split by parity
            i, j, k = 0, mid, lo
            while i < len(left) and j < hi:
                if nums[left[i]] <= nums[order[j]]:  # equal: the left element places first, uncounted
                    result[left[i]] += placed[(nums[left[i]] & 1) ^ 1]
                    order[k] = left[i]
                    i += 1
                else:
                    placed[nums[order[j]] & 1] += 1
                    order[k] = order[j]
                    j += 1
                k += 1
            while i < len(left):
                result[left[i]] += placed[(nums[left[i]] & 1) ^ 1]  # placed opposite-parity values all sit below it
                order[k] = left[i]
                i += 1
                k += 1

        merge_sort(0, n)
        return result
