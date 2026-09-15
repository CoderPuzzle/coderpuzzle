class Solution:
    def goodTriplets(self, nums1: list[int], nums2: list[int]) -> int:
        n = len(nums1)
        pos2 = [0] * n
        for i, value in enumerate(nums2):
            pos2[value] = i
        a = [pos2[value] for value in nums1]  # a[i] = position of nums1[i] in nums2

        smaller_after = [0] * n  # per index: later nums1 values that precede it in nums2
        order = list(range(n))  # merge-sort workspace of indexes, ordered by nums2 position

        def merge_sort(lo, hi):
            """Sort order[lo:hi] by nums2 position, tallying dominance into smaller_after."""
            if hi - lo < 2:
                return
            mid = (lo + hi) // 2
            merge_sort(lo, mid)
            merge_sort(mid, hi)
            left = order[lo:mid]
            i, j, k = 0, mid, lo
            while i < len(left) and j < hi:
                if a[left[i]] < a[order[j]]:
                    smaller_after[left[i]] += j - mid  # right-half values already placed below it
                    order[k] = left[i]
                    i += 1
                else:
                    order[k] = order[j]
                    j += 1
                k += 1
            while i < len(left):
                smaller_after[left[i]] += j - mid  # the whole right half sits below it
                order[k] = left[i]
                i += 1
                k += 1

        merge_sort(0, n)

        answer = 0
        for i in range(n):
            left = a[i] - smaller_after[i]  # values before value in nums1 and in nums2
            # values after value in both arrays
            right = (n - 1 - i) - smaller_after[i]
            answer += left * right
        return answer
