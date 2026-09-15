from typing import List, Optional
from bisect import bisect_right


class Solution:
    def longestObstacleCourseAtEachPosition(self, obstacles: List[int]) -> List[int]:
        # tails[j] = smallest possible tail of a non-decreasing subsequence
        # of length j+1 over the prefix so far; it stays sorted, so each
        # obstacle is placed by binary search.
        tails = []
        ans = []
        for x in obstacles:
            # bisect_right (first strictly greater tail) is the only change
            # vs strict LIS: an obstacle equal to a tail extends that course
            # instead of replacing it.
            i = bisect_right(tails, x)
            if i == len(tails):
                # At least as tall as every tail: starts a new longest course.
                tails.append(x)
            else:
                # Overwrite the first improvable tail, keeping it minimal so
                # the sorted invariant holds.
                tails[i] = x
            # Insertion index + 1 = longest course ending with this obstacle.
            ans.append(i + 1)
        return ans
