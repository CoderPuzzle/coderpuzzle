from typing import Callable, List, Optional


class TrafficLight:
    def __init__(self) -> None:
        raise NotImplementedError("TODO")

    def carArrived(
        self, carId: int, roadId: int, direction: int, turnGreen: Callable[[], None], crossCar: Callable[[], None]
    ) -> None:
        raise NotImplementedError("TODO")
