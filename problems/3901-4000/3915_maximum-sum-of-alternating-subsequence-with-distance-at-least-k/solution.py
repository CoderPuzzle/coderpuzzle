from typing import List


class Solution:
    def maxAlternatingSum(self, nums: List[int], k: int) -> int:
        values = sorted(set(nums))
        ranks = {value: i for i, value in enumerate(values)}
        size = 1
        while size < len(values):
            size *= 2
        down_tree = [0] * (2 * size)
        up_tree = [0] * (2 * size)

        def update(tree, index, value):
            index += size
            tree[index] = max(tree[index], value)
            index //= 2
            while index:
                tree[index] = max(tree[2 * index], tree[2 * index + 1])
                index //= 2

        def query(tree, left, right):
            left += size
            right += size
            best = 0
            while left < right:
                if left & 1:
                    best = max(best, tree[left])
                    left += 1
                if right & 1:
                    right -= 1
                    best = max(best, tree[right])
                left //= 2
                right //= 2
            return best

        up = [0] * len(nums)
        down = [0] * len(nums)
        answer = 0
        for i, value in enumerate(nums):
            if i >= k:
                eligible = i - k
                rank = ranks[nums[eligible]]
                update(up_tree, rank, up[eligible])
                update(down_tree, rank, down[eligible])
            rank = ranks[value]
            up[i] = value + query(down_tree, 0, rank)
            down[i] = value + query(up_tree, rank + 1, len(values))
            answer = max(answer, up[i], down[i])
        return answer
