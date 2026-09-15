class Solution:
    def maxDiff(self, num: int) -> int:
        s = str(num)

        # Maximum: rewrite the first non-9 digit (and its duplicates) to 9.
        big = s
        for digit in s:
            if digit != "9":
                big = s.replace(digit, "9")
                break

        # Minimum: the leading digit goes to 1 when it can, otherwise the
        # first digit > 1 anywhere after goes to 0.
        small = s
        if s[0] != "1":
            small = s.replace(s[0], "1")
        else:
            for digit in s:
                if digit != "0" and digit != "1":
                    small = s.replace(digit, "0")
                    break

        return int(big) - int(small)
