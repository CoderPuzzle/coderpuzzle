from typing import List


class Solution:
    def finalValueAfterOperations(self, operations: List[str]) -> int:
        value = 0
        for operation in operations:
            value += 1 if operation[1] == "+" else -1
        return value
