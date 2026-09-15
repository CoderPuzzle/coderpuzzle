from typing import List


class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> List[int]:
        # Fill nums1 from the back so the largest elements land last: the n
        # tail slots are declared scratch, and a write at m+n-1 moving down
        # can never pass an unread nums1 element.
        i, j = m - 1, n - 1
        write = m + n - 1
        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[write] = nums1[i]
                i -= 1
            else:
                nums1[write] = nums2[j]
                j -= 1
            write -= 1
        # nums2 is exhausted: any nums1 prefix left unread is already in place.
        return nums1
