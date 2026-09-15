class Solution:
    def addStrings(self, num1: str, num2: str) -> str:
        # Schoolbook addition: walk both numbers from their right ends one
        # column at a time, add the two digits plus the carry, and emit
        # total % 10. The whole inputs are never converted to integers —
        # only single characters, so the running total never exceeds 19.
        i, j = len(num1) - 1, len(num2) - 1
        carry = 0
        digits = []
        # Looping on "or carry" appends the final leading 1 when the sum is
        # one digit longer than both inputs; each side contributes only
        # while its index is in range, so unequal lengths need no padding.
        while i >= 0 or j >= 0 or carry:
            total = carry
            if i >= 0:
                total += ord(num1[i]) - ord("0")
                i -= 1
            if j >= 0:
                total += ord(num2[j]) - ord("0")
                j -= 1
            digits.append(chr(ord("0") + total % 10))
            carry = total // 10
        # Digits came out least-significant first; flip before joining.
        return "".join(reversed(digits))
