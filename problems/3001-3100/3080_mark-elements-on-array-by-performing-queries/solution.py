from typing import List


class Solution:
    def unmarkedSumArray(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        # Marking only ever removes elements, so one monotone sweep over the
        # indices sorted by (value, index) answers every query's "k smallest
        # unmarked" step: the pointer skips entries marked by name and never
        # revisits one. A running total absorbs each mark — it can reach
        # 10^5 * 10^5 = 10^10, beyond 32 bits, so Python's ints carry it.
        n = len(nums)
        order = sorted(range(n), key=lambda i: (nums[i], i))
        marked = [False] * n
        total = sum(nums)
        pointer = 0
        answer = []
        for index, count in queries:
            if not marked[index]:
                marked[index] = True
                total -= nums[index]
            taken = 0
            while taken < count and pointer < n:
                candidate = order[pointer]
                pointer += 1
                if marked[candidate]:
                    continue
                marked[candidate] = True
                total -= nums[candidate]
                taken += 1
            answer.append(total)
        return answer
