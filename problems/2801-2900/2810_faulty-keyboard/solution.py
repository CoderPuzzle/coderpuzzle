from typing import List, Optional


class Solution:
    def finalString(self, s: str) -> str:
        # Type characters into one growing buffer: letters append, and each
        # 'i' reverses everything typed so far. After the last keystroke the
        # buffer is exactly the laptop screen.
        screen = []
        for c in s:
            if c == "i":
                screen.reverse()
            else:
                screen.append(c)
        return "".join(screen)
