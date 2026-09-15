from typing import List, Optional


class Solution:
    def largestEven(self, s: str) -> str:
        # An even result must end in '2', and a longer number of these
        # digits always beats a shorter one, so the best keeps every
        # character up through the last '2' and sheds the odd tail.
        i = s.rfind("2")
        return "" if i < 0 else s[: i + 1]
