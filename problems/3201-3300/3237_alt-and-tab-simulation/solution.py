from typing import List


class Solution:
    def simulationResult(self, windows: List[int], queries: List[int]) -> List[int]:
        # The final stack lists windows by their most recent last touch,
        # with never-queried windows keeping their original order below.
        # Reading the queries backwards and appending each window not yet
        # appended emits exactly that: last touches newest-first, earlier
        # presses skipped because only the final press sets a window's
        # height. The second pass over windows appends the untouched rest
        # in its original order.
        seen = [False] * (len(windows) + 1)
        result = []
        for query in reversed(queries):
            if not seen[query]:
                seen[query] = True
                result.append(query)
        for window in windows:
            if not seen[window]:
                seen[window] = True
                result.append(window)
        return result
