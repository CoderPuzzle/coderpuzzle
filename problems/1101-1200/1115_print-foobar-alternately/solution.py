import threading
from typing import Callable


class FooBar:
    # One permit starts on foo's side, so the alternation opens with "foo";
    # each print hands the single permit to the other method.
    def __init__(self, n: int) -> None:
        self.n = n
        self.foo_permit = threading.Semaphore(1)
        self.bar_permit = threading.Semaphore(0)

    def foo(self, printFoo: Callable[[], None]) -> None:
        for _ in range(self.n):
            self.foo_permit.acquire()
            printFoo()
            self.bar_permit.release()

    def bar(self, printBar: Callable[[], None]) -> None:
        for _ in range(self.n):
            self.bar_permit.acquire()
            printBar()
            self.foo_permit.release()
