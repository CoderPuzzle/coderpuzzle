from typing import List


class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        # Bottom-up merge sort: no recursion and no library sort. A pass at
        # width w merges every pair of adjacent sorted runs of length w from
        # source into buffer, doubling the sorted-run length each pass; after
        # ceil(log2 n) passes the whole array is one sorted run. The merge
        # takes from the left run on ties, so equal values keep their
        # relative order — the sort is stable.
        n = len(nums)
        source = list(nums)
        buffer = [0] * n
        width = 1
        while width < n:
            for start in range(0, n, width * 2):
                middle = min(start + width, n)
                end = min(start + width * 2, n)
                i = start
                j = middle
                k = start
                while i < middle and j < end:
                    if source[j] < source[i]:
                        buffer[k] = source[j]
                        j += 1
                    else:
                        buffer[k] = source[i]
                        i += 1
                    k += 1
                while i < middle:
                    buffer[k] = source[i]
                    i += 1
                    k += 1
                while j < end:
                    buffer[k] = source[j]
                    j += 1
                    k += 1
            source, buffer = buffer, source
            width *= 2
        return source
