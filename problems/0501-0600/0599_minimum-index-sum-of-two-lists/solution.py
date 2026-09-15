from typing import List


class Solution:
    def findRestaurant(self, list1: List[str], list2: List[str]) -> List[str]:
        # The strings of each list are unique, so one map from a string to
        # its index in list1 settles every "where does it count from" query.
        index_of = {}
        for i, s in enumerate(list1):
            index_of[s] = i
        best = 0
        result: List[str] = []
        for j, s in enumerate(list2):
            i = index_of.get(s)
            if i is None:
                continue
            # A strictly smaller index sum restarts the winners at the new
            # minimum; an equal one extends the tie, so the winners come out
            # in the order they appear in list2.
            if not result or i + j < best:
                best = i + j
                result = [s]
            elif i + j == best:
                result.append(s)
        return result
