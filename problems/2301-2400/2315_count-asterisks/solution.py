class Solution:
    def countAsterisks(self, s: str) -> int:
        count = 0
        inside = False
        for ch in s:
            if ch == "|":
                inside = not inside
            elif not inside and ch == "*":
                count += 1
        return count
