class Solution:
    def maxIceCream(self, costs: List[int], coins: int) -> int:
        # Counting sort: tally each price, then sweep prices from cheapest.
        # Buying cheapest-first is optimal, and the tally makes that walk
        # O(max_price) instead of O(n log n).
        count = [0] * 100001
        for c in costs:
            count[c] += 1
        bought = 0
        for price in range(1, 100001):
            if count[price] == 0 or price > coins:
                continue
            afford = min(count[price], coins // price)
            bought += afford
            coins -= afford * price
            if coins == 0:
                break
        return bought
