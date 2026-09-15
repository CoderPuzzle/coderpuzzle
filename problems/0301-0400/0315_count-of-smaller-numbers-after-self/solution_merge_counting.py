class Solution:
    def countSmaller(self, nums: list[int]) -> list[int]:
        n = len(nums)
        result = [0] * n  # per index: strictly smaller values to its right
        order = list(range(n))  # merge-sort workspace of indexes, ordered by value

        def merge_sort(lo, hi):
            """Sort order[lo:hi] by value, tallying smaller right-half values into result."""
            if hi - lo < 2:
                return
            mid = (lo + hi) // 2
            merge_sort(lo, mid)
            merge_sort(mid, hi)
            left = order[lo:mid]
            i, j, k = 0, mid, lo
            while i < len(left) and j < hi:
                if nums[left[i]] <= nums[order[j]]:  # equal: the left element places first, uncounted
                    result[left[i]] += j - mid  # right-half values already placed below it
                    order[k] = left[i]
                    i += 1
                else:
                    order[k] = order[j]
                    j += 1
                k += 1
            while i < len(left):
                result[left[i]] += j - mid  # the whole right half sits below it
                order[k] = left[i]
                i += 1
                k += 1

        merge_sort(0, n)
        return result
