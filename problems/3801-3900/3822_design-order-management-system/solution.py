from typing import List, Optional


class OrderManagementSystem:
    """Two maps in lockstep: orders maps each orderId to its (type, price)
    attributes so modifyOrder/cancelOrder find the row in one lookup, and
    buckets groups the active ids under each (orderType, price) key so a
    query reads exactly its bucket. modifyOrder moves one id between
    buckets (a same-price move re-inserts under the same key); queries
    return the bucket sorted — the statement frees the order.
    """

    def __init__(self):
        self.orders = {}
        self.buckets = {}

    def addOrder(self, orderId: int, orderType: str, price: int):
        self.orders[orderId] = (orderType, price)
        self.buckets.setdefault((orderType, price), set()).add(orderId)

    def modifyOrder(self, orderId: int, newPrice: int):
        orderType, oldPrice = self.orders[orderId]
        self.buckets[(orderType, oldPrice)].discard(orderId)
        self.orders[orderId] = (orderType, newPrice)
        self.buckets.setdefault((orderType, newPrice), set()).add(orderId)

    def cancelOrder(self, orderId: int):
        orderType, price = self.orders.pop(orderId)
        self.buckets[(orderType, price)].discard(orderId)

    def getOrdersAtPrice(self, orderType: str, price: int) -> List[int]:
        return sorted(self.buckets.get((orderType, price), ()))
