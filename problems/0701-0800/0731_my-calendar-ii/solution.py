from typing import List


class MyCalendarTwo:
    """Two interval lists. `singles` holds every accepted booking; `doubles`
    holds the regions where two accepted bookings already overlap. A new
    event is scanned against `doubles` first -- meeting any of them would
    park a third event on the same moment, so it is refused and nothing is
    recorded. Otherwise each accepted event it overlaps contributes the
    intersection to `doubles`, and the event itself joins `singles`.
    """

    def __init__(self) -> None:
        self.singles: List[List[int]] = []
        self.doubles: List[List[int]] = []

    def book(self, start: int, end: int) -> bool:
        for lo, hi in self.doubles:
            if start < hi and lo < end:
                return False
        for lo, hi in self.singles:
            if start < hi and lo < end:
                self.doubles.append([max(start, lo), min(end, hi)])
        self.singles.append([start, end])
        return True
