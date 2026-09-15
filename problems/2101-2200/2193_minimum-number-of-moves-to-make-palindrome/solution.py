from typing import List, Optional


class Solution:
    def minMovesToMakePalindrome(self, s: str) -> int:
        s = list(s)
        moves = 0
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] == s[right]:
                left += 1
                right -= 1
                continue
            # find rightmost occurrence of s[left] in (left, right]
            k = right
            while k > left and s[k] != s[left]:
                k -= 1
            if k == left:
                # s[left] is the lone middle character: nudge it one step inward
                s[left], s[left + 1] = s[left + 1], s[left]
                moves += 1
            else:
                # bubble s[k] rightward to position right
                while k < right:
                    s[k], s[k + 1] = s[k + 1], s[k]
                    k += 1
                    moves += 1
                left += 1
                right -= 1
        return moves
