from typing import List


class Solution:
    def badSensor(self, sensor1: List[int], sensor2: List[int]) -> int:
        # A defective readout agrees with the truth up to the dropped point
        # and then matches the truth shifted one place left, so each
        # candidacy is a single scan; when both scans succeed (or both
        # fail), the defect cannot be pinned on either sensor.
        one = self._shifted(sensor1, sensor2)
        two = self._shifted(sensor2, sensor1)
        if one == two:
            return -1
        return 1 if one else 2

    def _shifted(self, a: List[int], b: List[int]) -> bool:
        i, n = 0, len(a)
        while i < n and a[i] == b[i]:
            i += 1
        while i < n - 1:
            if a[i] != b[i + 1]:
                return False
            i += 1
        return True
