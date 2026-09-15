from typing import Callable, List, Optional


class DiningPhilosophers:
    def __init__(self) -> None:
        raise NotImplementedError("TODO")

    def wantsToEat(
        self,
        philosopher: int,
        pickLeftFork: Callable[[], None],
        pickRightFork: Callable[[], None],
        eat: Callable[[], None],
        putLeftFork: Callable[[], None],
        putRightFork: Callable[[], None],
    ) -> None:
        raise NotImplementedError("TODO")
