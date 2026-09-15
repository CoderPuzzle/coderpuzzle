from typing import List


class Solution:
    def countSmallerOppositeParity(self, nums: List[int]) -> List[int]:
        ranks = {value: i + 1 for i, value in enumerate(sorted(set(nums)))}
        trees = [[0] * (len(ranks) + 1) for _ in range(2)]

        def query(tree, index):
            total = 0
            while index > 0:
                total += tree[index]
                index -= index & -index
            return total

        def update(tree, index):
            while index < len(tree):
                tree[index] += 1
                index += index & -index

        answer = [0] * len(nums)
        for i in range(len(nums) - 1, -1, -1):
            rank = ranks[nums[i]]
            parity = nums[i] & 1
            answer[i] = query(trees[parity ^ 1], rank - 1)
            update(trees[parity], rank)
        return answer
