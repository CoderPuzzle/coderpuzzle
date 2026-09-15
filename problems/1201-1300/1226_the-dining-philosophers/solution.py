import threading
from typing import Callable


class DiningPhilosophers:
    def __init__(self) -> None:
        # One permit per fork; even philosophers grab the left fork first and
        # odd ones the right, so the circular wait-chain of everyone grabbing
        # the same side first cannot form.
        self.forks = [threading.Semaphore(1) for _ in range(5)]

    def wantsToEat(
        self,
        philosopher: int,
        pickLeftFork: Callable[[], None],
        pickRightFork: Callable[[], None],
        eat: Callable[[], None],
        putLeftFork: Callable[[], None],
        putRightFork: Callable[[], None],
    ) -> None:
        left = self.forks[philosopher]
        right = self.forks[(philosopher + 1) % 5]
        first = left if philosopher % 2 == 0 else right
        second = right if philosopher % 2 == 0 else left
        first.acquire()
        second.acquire()
        pickLeftFork()
        pickRightFork()
        eat()
        putLeftFork()
        putRightFork()
        second.release()
        first.release()
