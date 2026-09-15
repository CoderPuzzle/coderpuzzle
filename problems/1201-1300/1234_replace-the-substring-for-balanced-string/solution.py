from collections import Counter
from typing import List


class Solution:
    def balancedString(self, s: str) -> int:
        n = len(s)
        target = n // 4
        # Surplus letters are the only ones the window must cover.
        need = {c: v - target for c, v in Counter(s).items() if v > target}
        if not need:
            return 0
        window = Counter()
        served = 0
        best = n
        left = 0
        for right, ch in enumerate(s):
            if ch in need:
                window[ch] += 1
                if window[ch] == need[ch]:
                    served += 1
            while served == len(need):
                best = min(best, right - left + 1)
                left_ch = s[left]
                if left_ch in need:
                    if window[left_ch] == need[left_ch]:
                        served -= 1
                    window[left_ch] -= 1
                left += 1
        return best
