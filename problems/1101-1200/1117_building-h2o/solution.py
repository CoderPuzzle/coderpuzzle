import threading
from typing import Callable


class H2O:
    # Two permits for hydrogen and one for oxygen cap what may be inside the
    # current molecule; the three-way barrier holds those threads together
    # until all of them have emitted, so no permit is returned early.
    def __init__(self) -> None:
        self.hydrogen_slots = threading.Semaphore(2)
        self.oxygen_slots = threading.Semaphore(1)
        self.molecule = threading.Barrier(3)

    def hydrogen(self, releaseHydrogen: Callable[[], None]) -> None:
        self.hydrogen_slots.acquire()
        releaseHydrogen()
        self.molecule.wait()
        self.hydrogen_slots.release()

    def oxygen(self, releaseOxygen: Callable[[], None]) -> None:
        self.oxygen_slots.acquire()
        releaseOxygen()
        self.molecule.wait()
        self.oxygen_slots.release()
