from typing import List, Optional


class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        # Taking the compatible pair that ends earliest leaves the most room,
        # so sorting by right endpoint makes a single greedy pass optimal.
        pairs = sorted(pairs, key=lambda p: p[1])
        length = 0
        current_end = float("-inf")
        for left, right in pairs:
            # Strict > encodes the strict b < c rule; touching pairs can't chain.
            if left > current_end:
                length += 1
                current_end = right
        return length
