from typing import List


class Solution:
    def numOfUnplacedFruits(self, fruits: List[int], baskets: List[int]) -> int:
        # Max segment tree over basket indices: each node holds the largest
        # capacity still free in its range, so "any basket here fits?" is one
        # comparison and the leftmost such basket is a root-to-leaf walk that
        # keeps left whenever the left subtree can still fit the fruit.
        n = len(baskets)
        size = 1
        while size < n:
            size *= 2
        tree = [0] * (2 * size)
        for j, capacity in enumerate(baskets):
            tree[size + j] = capacity
        for i in range(size - 1, 0, -1):
            tree[i] = max(tree[2 * i], tree[2 * i + 1])
        unplaced = 0
        for quantity in fruits:
            if tree[1] < quantity:
                # even the global maximum is too small: nothing fits anywhere
                unplaced += 1
                continue
            node = 1
            while node < size:
                node *= 2
                if tree[node] < quantity:
                    node += 1
            # retire the basket: 0 sits below every legal capacity
            tree[node] = 0
            node //= 2
            while node:
                tree[node] = max(tree[2 * node], tree[2 * node + 1])
                node //= 2
        return unplaced
