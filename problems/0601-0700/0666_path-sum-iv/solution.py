from typing import List


class Solution:
    def pathSum(self, nums: List[int]) -> int:
        # The first two digits of each code are the node's (depth, position);
        # keying a dict by them turns the array into the tree itself. A node
        # is a leaf exactly when neither child position exists one level
        # down, and a child at (d, p) hangs from the parent at
        # (d - 1, (p + 1) / 2), so each leaf, walked up to the root,
        # accumulates its whole path.
        tree = {}
        for code in nums:
            tree[(code // 100, code // 10 % 10)] = code % 10
        total = 0
        for code in nums:
            d, p = code // 100, code // 10 % 10
            if (d + 1, 2 * p - 1) in tree or (d + 1, 2 * p) in tree:
                continue
            while d > 0:
                total += tree[(d, p)]
                p = (p + 1) // 2
                d -= 1
        return total
