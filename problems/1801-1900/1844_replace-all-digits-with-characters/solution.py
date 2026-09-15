class Solution:
    def replaceDigits(self, s: str) -> str:
        # shift(c, x) is plain character arithmetic: ord(c) + x. Each digit
        # at an odd index pairs with the letter immediately before it.
        chars = list(s)
        for i in range(1, len(chars), 2):
            chars[i] = chr(ord(chars[i - 1]) + int(chars[i]))
        return "".join(chars)
