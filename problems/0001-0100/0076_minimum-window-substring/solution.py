from typing import List, Optional


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not t or len(t) > len(s):
            return ""
        # need[c] = copies of c the window still owes; missing = total owed
        # instances, so missing == 0 is an O(1) coverage test.
        need = {}
        for ch in t:
            need[ch] = need.get(ch, 0) + 1
        missing = len(t)
        best_start, best_len = 0, float("inf")
        left = 0
        for right, ch in enumerate(s):
            # need > 0 means this occurrence is genuinely required; the
            # unconditional decrement then drives surplus copies negative
            # without ever touching missing again.
            if need.get(ch, 0) > 0:
                missing -= 1
            need[ch] = need.get(ch, 0) - 1
            if missing == 0:
                # Valid window: shed surplus leftmost characters, returning
                # each released copy to the budget, until one sits at quota.
                while left < right and need[s[left]] < 0:
                    need[s[left]] += 1
                    left += 1
                if right - left + 1 < best_len:
                    best_start, best_len = left, right - left + 1
                # Evict the leftmost required character on purpose so the
                # search owes exactly one instance and scanning can resume.
                need[s[left]] += 1
                missing += 1
                left += 1
        return "" if best_len == float("inf") else s[best_start : best_start + best_len]
