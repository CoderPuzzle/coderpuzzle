class Solution:
    def checkValidString(self, s: str) -> bool:
        # The count of open '(' cannot be followed exactly through '*': every
        # star widens it into a range. lo tracks the fewest opens some
        # assignment leaves reachable, hi the most — '(' raises both, ')'
        # lowers both, and '*' trades one side for the other. lo is clamped
        # at 0 because a surplus ')' can never be undone later, while hi < 0
        # means even reading every '*' as '(' cannot absorb the ')' just
        # seen — false on the spot. The string is valid exactly when the
        # final range still contains 0.
        lo = hi = 0
        for c in s:
            if c == "(":
                lo += 1
                hi += 1
            elif c == ")":
                lo -= 1
                hi -= 1
            else:
                lo -= 1
                hi += 1
            if hi < 0:
                return False
            if lo < 0:
                lo = 0
        return lo == 0
