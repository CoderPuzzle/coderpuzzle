from typing import List


class Solution:
    def buttonWithLongestTime(self, events: List[List[int]]) -> int:
        # Press i takes time_i - time_{i-1} (its own time_i for the first
        # press). Keep the best press seen so far, replacing it on a
        # strictly longer time, or on an equal time from a smaller button
        # index — the statement's tie rule.
        best_index = events[0][0]
        best_taken = events[0][1]
        for i in range(1, len(events)):
            index, time = events[i]
            taken = time - events[i - 1][1]
            if taken > best_taken or (taken == best_taken and index < best_index):
                best_index = index
                best_taken = taken
        return best_index
