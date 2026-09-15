from typing import List, Optional


class Cashier:
    def __init__(self, n: int, discount: int, products: List[int], prices: List[int]):
        raise NotImplementedError("TODO")

    def getBill(self, product: List[int], amount: List[int]) -> float:
        raise NotImplementedError("TODO")
