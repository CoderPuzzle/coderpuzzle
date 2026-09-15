from functools import cache


class Solution:
    def possiblyEquals(self, s1: str, s2: str) -> bool:
        @cache
        def search(i: int, j: int, difference: int) -> bool:
            if i == len(s1) and j == len(s2):
                return difference == 0

            if i < len(s1) and s1[i].isdigit():
                value = 0
                for end in range(i, min(i + 3, len(s1))):
                    if not s1[end].isdigit():
                        break
                    value = value * 10 + int(s1[end])
                    if search(end + 1, j, difference + value):
                        return True

            if j < len(s2) and s2[j].isdigit():
                value = 0
                for end in range(j, min(j + 3, len(s2))):
                    if not s2[end].isdigit():
                        break
                    value = value * 10 + int(s2[end])
                    if search(i, end + 1, difference - value):
                        return True

            if difference > 0 and j < len(s2) and s2[j].isalpha():
                return search(i, j + 1, difference - 1)
            if difference < 0 and i < len(s1) and s1[i].isalpha():
                return search(i + 1, j, difference + 1)
            if (
                difference == 0
                and i < len(s1)
                and j < len(s2)
                and s1[i].isalpha()
                and s2[j].isalpha()
                and s1[i] == s2[j]
            ):
                return search(i + 1, j + 1, 0)
            return False

        return search(0, 0, 0)
