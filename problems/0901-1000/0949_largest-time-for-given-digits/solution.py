from typing import List


class Solution:
    def largestTimeFromDigits(self, arr: List[int]) -> str:
        # Four slots H1 H2 M1 M2 and four digits admit exactly 4! = 24
        # deals. A deal is a real time when the hour stays below 24 and
        # the minute below 60, and comparing survivors as minutes past
        # midnight picks the latest outright. The sentinel -1 means no
        # deal survived, so nothing beats it and the empty string is
        # returned.
        best = -1
        for i in range(4):
            for j in range(4):
                if j == i:
                    continue
                for k in range(4):
                    if k == i or k == j:
                        continue
                    l = 6 - i - j - k
                    hour = arr[i] * 10 + arr[j]
                    minute = arr[k] * 10 + arr[l]
                    if hour < 24 and minute < 60:
                        best = max(best, hour * 60 + minute)
        return "" if best < 0 else f"{best // 60:02d}:{best % 60:02d}"
