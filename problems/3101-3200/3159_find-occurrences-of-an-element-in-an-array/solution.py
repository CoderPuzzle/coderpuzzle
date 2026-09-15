from typing import List


class Solution:
    def occurrencesOfElement(self, nums: List[int], queries: List[int], x: int) -> List[int]:
        # One sweep records every index where x occurs, in order. Query k
        # then reads straight off that list: the k-th occurrence exists
        # exactly when k does not overrun it. Indices are 1-based ranks
        # into a 0-based list, hence the k - 1.
        positions = []
        for index, value in enumerate(nums):
            if value == x:
                positions.append(index)
        total = len(positions)
        answer = []
        for k in queries:
            if k <= total:
                answer.append(positions[k - 1])
            else:
                answer.append(-1)
        return answer
