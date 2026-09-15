from typing import List


class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        # The rules ask for the longest stretch of trees holding at most two
        # fruit types: two baskets, one type each, one fruit from every tree
        # picked while moving right. A sliding window over a type->count map
        # maintains exactly that — extend the right edge tree by tree, and
        # whenever a third type enters, retire trees from the left until one
        # type's count reaches zero and drops out. The window then always
        # spans the longest legal picking trip ending at the current tree, so
        # its length contests the answer at every step.
        count = {}
        best = 0
        left = 0
        for right, tree in enumerate(fruits):
            count[tree] = count.get(tree, 0) + 1
            while len(count) > 2:
                left_type = fruits[left]
                count[left_type] -= 1
                if count[left_type] == 0:
                    del count[left_type]
                left += 1
            best = max(best, right - left + 1)
        return best
