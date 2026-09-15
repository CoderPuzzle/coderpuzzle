from typing import List, Optional


class Solution:
    def findKthNumber(self, n: int, k: int) -> int:
        def count_steps(n, n1, n2):
            # Size of the subtree rooted at prefix n1: numbers in [1, n] that
            # lie in [n1, n2). One level at a time, [n1, n2) covers every
            # number sharing the prefix at that depth, so clamp the right edge
            # past n and scale both bounds by ten for the next level.
            steps = 0
            while n1 <= n:
                steps += min(n + 1, n2) - n1
                n1 *= 10
                n2 *= 10
            return steps

        # Lexicographic order = preorder walk of the denary tree (children
        # append digits 0-9); k becomes a zero-based count of nodes to skip.
        cur = 1
        k -= 1
        while k > 0:
            steps = count_steps(n, cur, cur + 1)
            # Whole subtree between cur and cur+1 fits the budget: skip it and
            # move to the next sibling; otherwise descend past cur itself.
            if steps <= k:
                cur += 1
                k -= steps
            else:
                cur *= 10
                k -= 1
        return cur
