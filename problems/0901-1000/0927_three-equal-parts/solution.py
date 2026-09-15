from typing import List


class Solution:
    def threeEqualParts(self, arr: List[int]) -> List[int]:
        # Equal parts repeat one binary value, so the array's 1s must divide
        # into three equal counts; the third part's 1s are the final
        # k = total/3 ones, and the suffix from its first 1 to the end is the
        # exact bit pattern every part must show after its own leading zeros.
        # Both earlier parts begin at a known 1 — the array's first, and the
        # (k+1)-th — so comparing the L bits past each anchor against that
        # suffix decides everything, and the cut points sit exactly L bits
        # past the anchors.
        total = sum(arr)
        if total == 0:
            return [0, 2]
        if total % 3 != 0:
            return [-1, -1]
        k = total // 3
        first = second = third = -1
        seen = 0
        for index, value in enumerate(arr):
            if value == 1:
                seen += 1
                if seen == 1:
                    first = index
                elif seen == k + 1:
                    second = index
                elif seen == 2 * k + 1:
                    third = index
        length = len(arr) - 1 - third
        for anchor in (first, second):
            for offset in range(length + 1):
                if arr[anchor + offset] != arr[third + offset]:
                    return [-1, -1]
        return [first + length, second + length + 1]
