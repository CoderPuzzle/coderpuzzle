from collections import deque


class RecentCounter:
    """A queue of ping times: `ping(t)` appends `t`, evicts everything
    older than the window's left edge `t - 3000` off the front — a time
    below that edge is below every future edge too, since `t` only grows —
    and returns how many times remain.
    """

    def __init__(self) -> None:
        self.times = deque()

    def ping(self, t: int) -> int:
        self.times.append(t)
        while self.times[0] < t - 3000:
            # The left edge t - 3000 only moves right, so everything
            # evicted now is gone from every future window as well.
            self.times.popleft()
        return len(self.times)
