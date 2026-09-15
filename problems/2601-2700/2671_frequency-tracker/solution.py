from typing import Dict


class FrequencyTracker:
    """Two counters kept in lockstep: number -> how many copies sit in the
    structure, and frequency -> how many numbers currently occur that often.
    Each add/delete moves one number between adjacent frequency buckets, so
    any hasFrequency question becomes a single lookup.
    """

    def __init__(self):
        self.count_of: Dict[int, int] = {}
        self.numbers_at: Dict[int, int] = {}

    def add(self, number: int):
        count = self.count_of.get(number, 0)
        self.count_of[number] = count + 1
        if count > 0:
            self.numbers_at[count] -= 1
        self.numbers_at[count + 1] = self.numbers_at.get(count + 1, 0) + 1

    def deleteOne(self, number: int):
        count = self.count_of.get(number, 0)
        if count == 0:
            return  # The structure may not contain it; delete nothing then.
        self.count_of[number] = count - 1
        self.numbers_at[count] -= 1
        if count > 1:
            self.numbers_at[count - 1] = self.numbers_at.get(count - 1, 0) + 1

    def hasFrequency(self, frequency: int) -> bool:
        return self.numbers_at.get(frequency, 0) > 0
