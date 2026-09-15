class Solution:
    def minPrice(self, prices: List[int], discounts: List[int]) -> float:
        # Sort both descending and pair positionally: by the exchange
        # argument, largest discount on largest price maximizes p*d/100.
        prices.sort(reverse=True)
        discounts.sort(reverse=True)
        saved = 0
        for price, discount in zip(prices, discounts):
            saved += price * discount
        # The product sum reaches 1e12 in exact integers; dividing once
        # yields the correctly rounded double of the rational total.
        return (sum(prices) * 100 - saved) / 100
