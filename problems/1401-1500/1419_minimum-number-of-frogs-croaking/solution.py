from typing import Dict


class Solution:
    def minNumberOfFrogs(self, croakOfFrogs: str) -> int:
        order = "croak"
        counts: Dict[str, int] = {c: 0 for c in order}
        active = 0
        answer = 0
        for ch in croakOfFrogs:
            index = order.index(ch)
            if index == 0:
                counts["c"] += 1
                active += 1
                if active > answer:
                    answer = active
            else:
                previous = order[index - 1]
                if counts[previous] == 0:
                    return -1
                counts[previous] -= 1
                counts[ch] += 1
                if ch == "k":
                    active -= 1
        if any(counts[c] for c in order[:4]):
            return -1
        return answer
