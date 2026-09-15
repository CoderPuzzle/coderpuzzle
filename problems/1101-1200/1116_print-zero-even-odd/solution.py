import threading
from typing import Callable


class ZeroEvenOdd:
    def __init__(self, n: int) -> None:
        self.n = n
        # The series is 0, 1, 0, 2, ...: position is the next number to emit,
        # and zero_due tells whether the 0 in front of it comes first.
        self.position = 1
        self.zero_due = True
        self.condition = threading.Condition()

    def _zero_step(self, printNumber: Callable[[int], None]) -> bool:
        # Emit the next 0 when it is this thread's turn; False once the
        # series is complete.
        with self.condition:
            while not self.zero_due and self.position <= self.n:
                self.condition.wait()
            if self.position > self.n:
                self.condition.notify_all()
                return False
            printNumber(0)
            self.zero_due = False
            self.condition.notify_all()
            return True

    def _number_step(self, printNumber: Callable[[int], None], matches) -> bool:
        # Emit position when it is a number's turn and this thread's parity;
        # False once the series is complete.
        with self.condition:
            while True:
                if self.position > self.n:
                    self.condition.notify_all()
                    return False
                if not self.zero_due and matches(self.position):
                    printNumber(self.position)
                    self.position += 1
                    self.zero_due = True
                    self.condition.notify_all()
                    return True
                self.condition.wait()

    def zero(self, printNumber: Callable[[int], None]) -> None:
        while self._zero_step(printNumber):
            pass

    def even(self, printNumber: Callable[[int], None]) -> None:
        while self._number_step(printNumber, lambda value: value % 2 == 0):
            pass

    def odd(self, printNumber: Callable[[int], None]) -> None:
        while self._number_step(printNumber, lambda value: value % 2 == 1):
            pass
