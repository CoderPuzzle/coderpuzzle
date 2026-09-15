class MyCalendarThree:
    # Boundary deltas keyed by time: +1 at each start, -1 at each end.
    def __init__(self) -> None:
        self.delta = {}

    def book(self, startTime: int, endTime: int) -> int:
        self.delta[startTime] = self.delta.get(startTime, 0) + 1
        self.delta[endTime] = self.delta.get(endTime, 0) - 1
        best = 0
        active = 0
        # Sweep boundaries in time order; the running sum is the number of
        # events active at that moment, so its peak is the max k-booking.
        # Deltas merge per time, so half-open touches never double-count.
        for time in sorted(self.delta):
            active += self.delta[time]
            if active > best:
                best = active
        return best
