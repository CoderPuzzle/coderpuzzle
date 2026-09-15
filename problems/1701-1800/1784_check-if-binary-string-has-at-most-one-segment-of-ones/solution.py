from typing import List, Optional


class Solution:
    def checkOnesSegment(self, s: str) -> bool:
        # A segment is a maximal run of ones; a new one starts wherever
        # a '1' follows a '0'. Bail out as soon as a second starts.
        segments = 0
        for i, c in enumerate(s):
            if c == "1" and (i == 0 or s[i - 1] == "0"):
                segments += 1
                if segments > 1:
                    return False
        return True
