from typing import List
from collections import defaultdict


class Solution:
    def findHighAccessEmployees(self, access_times: List[List[str]]) -> List[str]:
        # Bucket per employee; "HHMM" becomes 60 * HH + MM so the one-hour
        # rule is a plain integer span. After sorting a bucket, the employee
        # is high-access iff some three consecutive stamps span < 60: any
        # qualifying triple's earliest three members are consecutive, and a
        # consecutive triple under an hour is itself a witness.
        buckets = defaultdict(list)
        for name, stamp in access_times:
            buckets[name].append(60 * int(stamp[:2]) + int(stamp[2:]))
        answer = []
        for name, minutes in buckets.items():
            minutes.sort()
            if any(minutes[k + 2] - minutes[k] < 60 for k in range(len(minutes) - 2)):
                answer.append(name)
        return answer
