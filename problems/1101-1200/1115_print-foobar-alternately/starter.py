from typing import Callable, List, Optional


class FooBar:
    def __init__(self, n: int) -> None:
        raise NotImplementedError("TODO")

    def foo(self, printFoo: Callable[[], None]) -> None:
        raise NotImplementedError("TODO")

    def bar(self, printBar: Callable[[], None]) -> None:
        raise NotImplementedError("TODO")
