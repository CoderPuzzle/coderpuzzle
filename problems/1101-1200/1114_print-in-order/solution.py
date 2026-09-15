import threading
from typing import Callable


class Foo:
    # One one-shot gate per happens-before edge: second waits for the gate
    # first opens, third waits for the gate second opens.
    def __init__(self) -> None:
        self.second_gate = threading.Event()
        self.third_gate = threading.Event()

    def first(self, printFirst: Callable[[], None]) -> None:
        printFirst()
        # Emit before opening the gate, so second can never overtake.
        self.second_gate.set()

    def second(self, printSecond: Callable[[], None]) -> None:
        self.second_gate.wait()
        printSecond()
        self.third_gate.set()

    def third(self, printThird: Callable[[], None]) -> None:
        self.third_gate.wait()
        printThird()
