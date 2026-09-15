from typing import List


class Solution:
    def canEat(self, candiesCount: List[int], queries: List[List[int]]) -> List[bool]:
        # Prefix sums: pref[i] is the total candies in types 0 .. i-1.
        # The earliest day type t can be touched is pref[t] // cap (eat cap
        # every day); the latest is pref[t] + candiesCount[t] - 1 (eat one
        # every day). The query holds iff favoriteDay lies in that window.
        pref = [0]
        for c in candiesCount:
            pref.append(pref[-1] + c)
        answer = []
        for t, day, cap in queries:
            earliest = pref[t] // cap
            latest = pref[t] + candiesCount[t] - 1
            answer.append(earliest <= day <= latest)
        return answer
