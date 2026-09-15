class Solution:
    def canBeValid(self, s: str, locked: str) -> bool:
        if len(s) % 2 == 1:
            return False
        minimum = maximum = 0
        for character, is_locked in zip(s, locked):
            if is_locked == "0":
                minimum -= 1
                maximum += 1
            elif character == "(":
                minimum += 1
                maximum += 1
            else:
                minimum -= 1
                maximum -= 1
            if maximum < 0:
                return False
            minimum = max(minimum, 0)
        return minimum == 0
