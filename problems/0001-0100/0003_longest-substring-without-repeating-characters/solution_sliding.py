from typing import List, Optional


class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # in_window holds exactly the characters of the window s[start..i],
        # which never contains a duplicate.
        in_window = set()
        start = 0
        best = 0
        for i, c in enumerate(s):
            # Evict characters from the left until c can enter without
            # duplicating: the window shrinks one step at a time.
            while c in in_window:
                in_window.remove(s[start])
                start += 1
            in_window.add(c)
            # The window is duplicate-free again: record its length.
            best = max(best, i - start + 1)
        return best
