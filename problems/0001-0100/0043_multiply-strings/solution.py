class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        # The product of an m-digit and an n-digit number has at most m + n
        # digits, so accumulate raw digit-pair products into exactly that many
        # cells before carrying anything.
        m, n = len(num1), len(num2)
        digits = [0] * (m + n)
        for i in range(m - 1, -1, -1):
            d1 = ord(num1[i]) - ord("0")
            for j in range(n - 1, -1, -1):
                # Digit i of num1 times digit j of num2 lands at i + j + 1
                # (most-significant-first indexing), so every pair can add
                # into its cell directly; no carrying yet.
                digits[i + j + 1] += d1 * (ord(num2[j]) - ord("0"))
        # One right-to-left pass normalizes each cell to a single digit and
        # pushes the overflow one cell left, exactly like schoolbook carrying.
        carry = 0
        for k in range(len(digits) - 1, -1, -1):
            total = digits[k] + carry
            digits[k] = total % 10
            carry = total // 10
        # Neither input has a leading zero, so the product has m + n or
        # m + n - 1 digits; strip the unused leading cell, keeping at least
        # one digit so "0" operands yield "0" with no special case.
        start = 0
        while start < len(digits) - 1 and digits[start] == 0:
            start += 1
        return "".join(str(d) for d in digits[start:])
