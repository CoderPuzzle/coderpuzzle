from typing import List, Optional


class OrderManagementSystem:
    def __init__(self):
        raise NotImplementedError("TODO")

    def addOrder(self, orderId: int, orderType: str, price: int):
        raise NotImplementedError("TODO")

    def modifyOrder(self, orderId: int, newPrice: int):
        raise NotImplementedError("TODO")

    def cancelOrder(self, orderId: int):
        raise NotImplementedError("TODO")

    def getOrdersAtPrice(self, orderType: str, price: int) -> List[int]:
        raise NotImplementedError("TODO")
