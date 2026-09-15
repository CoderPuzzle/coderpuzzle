from typing import List, Optional


class Solution:
    def finalPrices(self, prices: List[int]) -> List[int]:
        answer = list(prices)
        stack = []  # indices with pending discount
        for i, price in enumerate(prices):
            while stack and prices[stack[-1]] >= price:
                answer[stack.pop()] -= price
            stack.append(i)
        return answer
