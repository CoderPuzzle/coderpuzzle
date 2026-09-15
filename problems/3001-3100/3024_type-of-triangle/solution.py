from typing import List


class Solution:
    def triangleType(self, nums: List[int]) -> str:
        # A triple is a triangle only when every pair of sides sums to
        # strictly more than the third side. Strictness rejects the
        # degenerate case where the two shorter sides merely equal the
        # longest one: [1, 2, 3] lies flat and gets "none", not a type.
        a, b, c = nums
        if a + b <= c or a + c <= b or b + c <= a:
            return "none"
        # With validity settled, compare the lengths directly: all equal
        # is "equilateral", any single matching pair is "isosceles", and
        # all distinct is "scalene". With only three sides at most one
        # pair can match unless all three do, so this ladder is
        # exhaustive.
        if a == b == c:
            return "equilateral"
        if a == b or b == c or a == c:
            return "isosceles"
        return "scalene"
