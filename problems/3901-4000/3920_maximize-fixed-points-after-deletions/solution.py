from typing import List


class Solution:
    def maxFixedPoints(self, nums: List[int]) -> int:
        candidates = sorted((value, index - value) for index, value in enumerate(nums) if value <= index)
        bit = [0] * (len(nums) + 1)

        def query(index: int) -> int:
            best = 0
            index += 1
            while index > 0:
                best = max(best, bit[index])
                index -= index & -index
            return best

        def update(index: int, value: int) -> None:
            index += 1
            while index < len(bit):
                bit[index] = max(bit[index], value)
                index += index & -index

        answer = 0
        start = 0
        while start < len(candidates):
            end = start
            pending = []
            while end < len(candidates) and candidates[end][0] == candidates[start][0]:
                deletion_count = candidates[end][1]
                length = query(deletion_count) + 1
                pending.append((deletion_count, length))
                answer = max(answer, length)
                end += 1
            for deletion_count, length in pending:
                update(deletion_count, length)
            start = end
        return answer
