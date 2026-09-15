from typing import List


class Solution:
    def findingUsersActiveMinutes(self, logs: List[List[int]], k: int) -> List[int]:
        # A user's UAM is the size of the set of minutes they acted in, so one
        # pass grouping logs into per-user minute sets is all the counting
        # needed; each user then lands in exactly one answer bucket.
        minutes_by_user = {}
        for user, minute in logs:
            minutes_by_user.setdefault(user, set()).add(minute)
        answer = [0] * k
        for minutes in minutes_by_user.values():
            # k covers every user's UAM by the constraints; the guard only
            # keeps a malformed k from writing out of range.
            if len(minutes) <= k:
                answer[len(minutes) - 1] += 1
        return answer
