from collections import defaultdict
from typing import List


class Solution:
    def alertNames(self, keyName: List[str], keyTime: List[str]) -> List[str]:
        # Group each worker's swipe times together; comparisons only ever
        # happen within one worker's own history.
        times_by_name = defaultdict(list)
        for name, time in zip(keyName, keyTime):
            hours, minutes = time.split(":")
            # Every swipe falls on a single day, so minutes-since-midnight is
            # all the arithmetic needed — no wraparound to handle.
            times_by_name[name].append(60 * int(hours) + int(minutes))

        alerted = []
        for name, times in times_by_name.items():
            times.sort()
            # A window of three consecutive swipes spans at most 60 minutes
            # exactly when the alert condition is met.
            for i in range(len(times) - 2):
                if times[i + 2] - times[i] <= 60:
                    alerted.append(name)
                    break

        alerted.sort()
        return alerted
