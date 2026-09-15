class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        # Every letter of s reappears somewhere in t, so folding both
        # strings into one XOR accumulator cancels each shuffled pair
        # and leaves only the added letter's code.
        code = 0
        for ch in s:
            code ^= ord(ch)
        for ch in t:
            code ^= ord(ch)
        return chr(code)
