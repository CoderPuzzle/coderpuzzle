from typing import List


class Solution:
    def reformat(self, s: str) -> str:
        letters: List[str] = []
        digits: List[str] = []
        for c in s:
            if c.isdigit():
                digits.append(c)
            else:
                letters.append(c)
        if abs(len(letters) - len(digits)) > 1:
            return ""
        result: List[str] = []
        if len(letters) >= len(digits):
            first, second = letters, digits
        else:
            first, second = digits, letters
        for i in range(len(first)):
            result.append(first[i])
            if i < len(second):
                result.append(second[i])
        return "".join(result)
