from typing import List, Optional


class Solution:
    def minimumBuckets(self, hamsters: str) -> int:
        street = list(hamsters)
        buckets = 0
        for index, cell in enumerate(street):
            if cell != "H":
                continue
            if index > 0 and street[index - 1] == "B":
                continue
            if index + 1 < len(street) and street[index + 1] == ".":
                street[index + 1] = "B"
                buckets += 1
            elif index > 0 and street[index - 1] == ".":
                street[index - 1] = "B"
                buckets += 1
            else:
                return -1
        return buckets
