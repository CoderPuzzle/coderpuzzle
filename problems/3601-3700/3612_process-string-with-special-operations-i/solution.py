from typing import List, Optional


class Solution:
    def processStr(self, s: str) -> str:
        # The specials mutate the result built so far: letters append,
        # '*' drops the tail, '#' doubles, '%' reverses. With s capped at
        # 20 chars the result never exceeds 2^19 characters, so building
        # the string directly is cheap and obviously correct.
        result = ""
        for ch in s:
            if "a" <= ch <= "z":
                result += ch
            elif ch == "*":
                result = result[:-1]
            elif ch == "#":
                result += result
            else:  # '%'
                result = result[::-1]
        return result
