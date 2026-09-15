from typing import List, Optional


class Solution:
    def longestValidParentheses(self, s: str) -> int:
        # Stack of indices seeded with -1: a sentinel base marking the
        # position just before the current candidate stretch.
        stack = [-1]
        best = 0
        for i, ch in enumerate(s):
            # Every '(' index is pushed, so the stack holds the still-
            # unmatched openers in order, with the base beneath them.
            if ch == "(":
                stack.append(i)
            else:
                stack.pop()
                if not stack:
                    # The pop emptied the stack: this ')' is unmatched and can
                    # never sit inside a valid substring, so its index becomes
                    # the new base, fencing off everything to its left.
                    stack.append(i)
                else:
                    # The popped index was the '(' matching this ')'. The top
                    # now names the closest barrier before the stretch ending
                    # here, so i - stack[-1] is its full length; barriers only
                    # disappear by being matched, so "()()" measures 4, not 2.
                    if i - stack[-1] > best:
                        best = i - stack[-1]
        return best
