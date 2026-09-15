from typing import List


class Solution:
    def miceAndCheese(self, reward1: List[int], reward2: List[int], k: int) -> int:
        # Start from the second mouse eating everything, then hand k cheeses
        # to the first mouse. Swapping cheese i changes the total by
        # reward1[i] - reward2[i], so the k swaps with the largest gains are
        # optimal — gains may be negative when forced, and taking the top k
        # regardless is exactly what "exactly k" demands.
        total = sum(reward2)
        gains = sorted((a - b for a, b in zip(reward1, reward2)), reverse=True)
        return total + sum(gains[:k])
