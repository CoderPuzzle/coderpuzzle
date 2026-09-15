from typing import List


class Solution:
    def maxNumber(self, nums1: List[int], nums2: List[int], k: int) -> List[int]:
        best: List[int] = []
        # Try every split of the k digits between the two arrays and keep the
        # best merged candidate; the answer is the max over all splits.
        for take1 in range(len(nums1) + 1):
            take2 = k - take1
            if 0 <= take2 <= len(nums2):
                candidate = self._merge(self._max_subsequence(nums1, take1), self._max_subsequence(nums2, take2))
                if candidate > best:
                    best = candidate
        return best

    def _max_subsequence(self, nums: List[int], t: int) -> List[int]:
        # Monotonic stack: while digits can still be dropped, pop any smaller
        # digit in front of a larger newcomer, then keep the first t of the stack.
        drop = len(nums) - t
        stack: List[int] = []
        for num in nums:
            while drop and stack and stack[-1] < num:
                stack.pop()
                drop -= 1
            stack.append(num)
        return stack[:t]

    def _merge(self, a: List[int], b: List[int]) -> List[int]:
        merged: List[int] = []
        i = j = 0
        while i < len(a) and j < len(b):
            # Equal heads are decided by comparing the tails that follow.
            if self._greater(a, i, b, j):
                merged.append(a[i])
                i += 1
            else:
                merged.append(b[j])
                j += 1
        merged.extend(a[i:])
        merged.extend(b[j:])
        return merged

    @staticmethod
    def _greater(a: List[int], i: int, b: List[int], j: int) -> bool:
        # Is a[i:] the larger remaining sequence? Skip the equal prefix first;
        # whichever tail runs out (or holds the smaller digit) loses the tie.
        while i < len(a) and j < len(b) and a[i] == b[j]:
            i += 1
            j += 1
        return j == len(b) or (i < len(a) and a[i] > b[j])
