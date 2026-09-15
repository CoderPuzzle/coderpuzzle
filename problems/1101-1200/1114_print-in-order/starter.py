from typing import Callable, List, Optional


class Foo:
    def __init__(self) -> None:
        raise NotImplementedError("TODO")

    def first(self, printFirst: Callable[[], None]) -> None:
        raise NotImplementedError("TODO")

    def second(self, printSecond: Callable[[], None]) -> None:
        raise NotImplementedError("TODO")

    def third(self, printThird: Callable[[], None]) -> None:
        raise NotImplementedError("TODO")
