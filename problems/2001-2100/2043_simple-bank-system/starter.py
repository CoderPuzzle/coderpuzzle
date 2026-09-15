from typing import List, Optional


class Bank:
    def __init__(self, balance: List[int]):
        raise NotImplementedError("TODO")

    def transfer(self, account1: int, account2: int, money: int) -> bool:
        raise NotImplementedError("TODO")

    def deposit(self, account: int, money: int) -> bool:
        raise NotImplementedError("TODO")

    def withdraw(self, account: int, money: int) -> bool:
        raise NotImplementedError("TODO")
