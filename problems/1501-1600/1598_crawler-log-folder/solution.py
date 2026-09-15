from typing import List, Optional


class Solution:
    def minOperations(self, logs: List[str]) -> int:
        # Track only the current depth: "../" backs up (never below the
        # main folder), "./" is a no-op, and any other entry descends
        # into a named child folder. The final depth is exactly the
        # number of "../" moves needed to return to the main folder.
        depth = 0
        for log in logs:
            if log == "../":
                depth = max(depth - 1, 0)
            elif log == "./":
                continue
            else:
                depth += 1
        return depth
