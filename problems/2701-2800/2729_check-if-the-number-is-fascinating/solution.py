class Solution:
    def isFascinating(self, n: int) -> bool:
        digits = f"{n}{2 * n}{3 * n}"
        if len(digits) != 9:
            return False

        seen = [False] * 10
        for char in digits:
            digit = int(char)
            if digit == 0 or seen[digit]:
                return False
            seen[digit] = True
        return True
