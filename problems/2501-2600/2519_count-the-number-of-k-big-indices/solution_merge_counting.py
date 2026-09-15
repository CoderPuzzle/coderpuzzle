from typing import List


class Solution:
    def kBigIndices(self, nums: List[int], k: int) -> int:
        # One merge sort over value/index pairs fills both tallies at once.
        # When a merge places a left-half element, every right-half element
        # already placed is strictly smaller than it; when it places a
        # right-half element, a crawl over the sorted left run counts its
        # strictly smaller predecessors. Each pair of positions is weighed
        # at exactly the one merge whose split separates it, so both counts
        # are complete when the sort ends; equal values place left-first and
        # are never credited. A position is k-big exactly when both counts
        # reach k.
        n = len(nums)
        left_counts = [0] * n
        right_counts = [0] * n
        order = list(range(n))  # merge-sort workspace of indexes, ordered by value

        def merge_sort(lo, hi):
            if hi - lo < 2:
                return
            mid = (lo + hi) // 2
            merge_sort(lo, mid)
            merge_sort(mid, hi)
            left = order[lo:mid]
            i, j, w, s = 0, mid, lo, 0
            while i < len(left) and j < hi:
                if nums[left[i]] <= nums[order[j]]:
                    # equal: the left element places first, uncounted
                    right_counts[left[i]] += j - mid  # right-half values already placed below it
                    order[w] = left[i]
                    i += 1
                else:
                    while s < len(left) and nums[left[s]] < nums[order[j]]:
                        s += 1
                    left_counts[order[j]] += s  # left-half values strictly below it
                    order[w] = order[j]
                    j += 1
                w += 1
            while i < len(left):
                right_counts[left[i]] += j - mid  # the whole right half sits below it
                order[w] = left[i]
                i += 1
                w += 1
            while j < hi:
                while s < len(left) and nums[left[s]] < nums[order[j]]:
                    s += 1
                left_counts[order[j]] += s
                order[w] = order[j]
                j += 1
                w += 1

        merge_sort(0, n)
        return sum(1 for i in range(n) if left_counts[i] >= k and right_counts[i] >= k)
