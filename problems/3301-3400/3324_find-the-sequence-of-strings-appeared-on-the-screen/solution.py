from typing import List


class Solution:
    def stringSequence(self, target: str) -> List[str]:
        # Minimum presses are forced: each new position starts with key 1
        # (key 2 on an empty screen is impossible), appending 'a', and key
        # 2 then advances that last character (c - 'a') times to the
        # wanted one. The screen states therefore stream out
        # deterministically — for each position, emit the string after the
        # append and again after every advance — which is exactly the
        # sequence of all strings that ever appear.
        screen: List[str] = []
        states: List[str] = []
        for c in target:
            screen.append("a")
            states.append("".join(screen))
            for _ in range(ord(c) - ord("a")):
                screen[-1] = chr(ord(screen[-1]) + 1)
                states.append("".join(screen))
        return states
