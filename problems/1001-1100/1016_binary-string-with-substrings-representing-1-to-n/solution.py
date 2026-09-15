class Solution:
    def queryString(self, s: str, n: int) -> bool:
        # 10^9 fits in 30 bits, so every i in [1, n] has a short binary
        # form; checking each one as a substring of s directly answers
        # the question.
        for i in range(1, n + 1):
            if bin(i)[2:] not in s:
                return False
        return True
