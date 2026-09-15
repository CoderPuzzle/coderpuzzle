class Solution:
    def encode(self, num: int) -> str:
        # num + 1 in binary, minus its leading 1.
        return bin(num + 1)[3:]
