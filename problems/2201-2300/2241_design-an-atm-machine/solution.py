from typing import List


class ATM:
    _VALUES = (20, 50, 100, 200, 500)

    def __init__(self):
        self.counts = [0] * 5

    def deposit(self, banknotesCount: List[int]):
        for i, c in enumerate(banknotesCount):
            self.counts[i] += c

    def withdraw(self, amount: int) -> List[int]:
        taken = [0] * 5
        remaining = amount
        for i in range(4, -1, -1):
            note = self._VALUES[i]
            use = min(self.counts[i], remaining // note)
            taken[i] = use
            remaining -= use * note
        if remaining != 0:
            return [-1]
        for i in range(5):
            self.counts[i] -= taken[i]
        return taken
