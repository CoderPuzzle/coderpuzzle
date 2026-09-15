from typing import List


class Solution:
    def maxAbsValExpr(self, arr1: List[int], arr2: List[int]) -> int:
        # |A|+|B|+|C| = max over sign triples of s1*A + s2*B + s3*C, so the
        # best pair distance is the widest span of one of 8 projections.
        best = None
        for s1 in (1, -1):
            for s2 in (1, -1):
                for s3 in (1, -1):
                    high = low = s1 * arr1[0] + s2 * arr2[0]
                    for k in range(len(arr1)):
                        value = s1 * arr1[k] + s2 * arr2[k] + s3 * k
                        if value > high:
                            high = value
                        elif value < low:
                            low = value
                    span = high - low
                    if best is None or span > best:
                        best = span
        return best
