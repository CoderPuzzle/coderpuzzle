from typing import List


class Cashier:
    """A product-to-price map plus a served-customer counter; every n-th
    customer pays bill * (100 - discount) / 100."""

    def __init__(self, n: int, discount: int, products: List[int], prices: List[int]):
        self._n = n
        self._discount = discount
        self._prices = dict(zip(products, prices))
        self._customers = 0

    def getBill(self, product: List[int], amount: List[int]) -> float:
        bill = sum(self._prices[p] * a for p, a in zip(product, amount))
        self._customers += 1
        if self._customers % self._n == 0:
            return bill * (100 - self._discount) / 100
        return float(bill)
