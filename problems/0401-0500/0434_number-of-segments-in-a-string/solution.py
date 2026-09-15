class Solution:
    def countSegments(self, s: str) -> int:
        # A segment starts exactly where a non-space character follows a
        # space — or where the string itself begins — so counting segments
        # is counting their first characters.
        count = 0
        # One left-to-right pass tests that boundary condition at every
        # position: leading, trailing, and repeated interior spaces never
        # register, and an empty string offers no position at all.
        for i, ch in enumerate(s):
            if ch != " " and (i == 0 or s[i - 1] == " "):
                count += 1
        return count
