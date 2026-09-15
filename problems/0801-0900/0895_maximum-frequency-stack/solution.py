from typing import Dict, List


class FreqStack:
    """Frequency buckets: groups[f-1] is the stack of values at frequency f.

    The top of the highest non-empty bucket is the most recent value among
    the most frequent ones — exactly what pop must return.
    """

    def __init__(self) -> None:
        self.freq: Dict[int, int] = {}
        self.groups: List[List[int]] = []  # groups[f-1] holds values at freq f
        self.maxfreq = 0

    def push(self, val: int) -> None:
        frequency = self.freq.get(val, 0) + 1
        self.freq[val] = frequency
        if frequency > len(self.groups):
            self.groups.append([])
        self.groups[frequency - 1].append(val)
        if frequency > self.maxfreq:
            self.maxfreq = frequency

    def pop(self) -> int:
        top = self.groups[self.maxfreq - 1]
        val = top.pop()
        self.freq[val] -= 1
        if not top:
            self.maxfreq -= 1
        return val
