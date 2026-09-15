from typing import List


class Solution:
    def reversePairs(self, nums: List[int]) -> int:
        def merge_count(arr):
            if len(arr) <= 1:
                return arr, 0
            mid = len(arr) // 2
            left, c1 = merge_count(arr[:mid])
            right, c2 = merge_count(arr[mid:])
            # Pairs inside either half are already counted; only cross pairs
            # remain, and both halves come back sorted.
            count = c1 + c2
            # count cross reverse pairs: left[i] > 2 * right[j]
            # j never restarts: the next left[i] is at least as large, so
            # every right element already passed also qualifies — the sweep
            # is linear per merge level.
            j = 0
            for i in range(len(left)):
                while j < len(right) and left[i] > 2 * right[j]:
                    j += 1
                count += j
            # merge
            merged = []
            i = j = 0
            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    merged.append(left[i])
                    i += 1
                else:
                    merged.append(right[j])
                    j += 1
            merged.extend(left[i:])
            merged.extend(right[j:])
            return merged, count

        return merge_count(nums)[1]
