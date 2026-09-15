from typing import List


class Solution:
    def arrayChange(self, nums: List[int], operations: List[List[int]]) -> List[int]:
        final_name = {}
        for replaced, replacement in reversed(operations):
            final_name[replaced] = final_name.get(replacement, replacement)
        return [final_name.get(value, value) for value in nums]
