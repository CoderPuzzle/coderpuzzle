from typing import List, Optional


class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        from functools import cmp_to_key

        strs = [str(n) for n in nums]

        # a precedes b exactly when the concatenation a + b beats b + a —
        # numeric comparison is useless (3 must come before 30).
        def compare(a, b):
            if a + b > b + a:
                return -1
            if a + b < b + a:
                return 1
            return 0

        # A sorted result admits no adjacent swap that enlarges the string,
        # so it is the maximal arrangement.
        strs.sort(key=cmp_to_key(compare))
        result = "".join(strs)
        # Leading zero means every input was 0.
        return "0" if result[0] == "0" else result
