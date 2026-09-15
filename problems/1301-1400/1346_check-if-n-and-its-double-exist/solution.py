from typing import List


class Solution:
    def checkIfExist(self, arr: List[int]) -> bool:
        # Insert after the lookup so an element can never match itself.
        seen = set()
        for value in arr:
            if 2 * value in seen or (value % 2 == 0 and value // 2 in seen):
                return True
            seen.add(value)
        return False
