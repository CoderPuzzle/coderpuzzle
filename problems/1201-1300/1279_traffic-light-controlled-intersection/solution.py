import threading
from typing import Callable


class TrafficLight:
    def __init__(self) -> None:
        # Road 1 (A) is green initially; the lock serializes arrivals so the
        # light is switched only when the crossing road actually changes and
        # no two cars from different roads ever cross together.
        self.lock = threading.Lock()
        self.green_road = 1

    def carArrived(
        self, carId: int, roadId: int, direction: int, turnGreen: Callable[[], None], crossCar: Callable[[], None]
    ) -> None:
        with self.lock:
            if self.green_road != roadId:
                turnGreen()
                self.green_road = roadId
            crossCar()
