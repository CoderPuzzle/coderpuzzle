from typing import List


class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        # A student who does not want the top sandwich just cycles to the
        # back, leaving the queue in the same state — so only the two
        # preference counts matter. Spend them down the stack and stop at
        # the first unwanted sandwich.
        count = [0, 0]
        for preference in students:
            count[preference] += 1
        for sandwich in sandwiches:
            # nobody left prefers this type, and nothing below the top of
            # the stack is reachable — everyone remaining goes hungry
            if count[sandwich] == 0:
                break
            count[sandwich] -= 1
        return count[0] + count[1]
