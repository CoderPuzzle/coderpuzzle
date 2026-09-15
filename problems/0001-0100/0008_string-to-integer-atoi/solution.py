class Solution:
    def myAtoi(self, s: str) -> int:
        # One left-to-right scan over s implements the statement's four steps
        # in order: whitespace, signedness, conversion, rounding.
        i, n = 0, len(s)
        while i < n and s[i] == " ":
            i += 1
        sign = 1
        if i < n and s[i] in "+-":
            if s[i] == "-":
                sign = -1
            i += 1
        total = 0
        while i < n and "0" <= s[i] <= "9":
            digit = ord(s[i]) - ord("0")
            # Clamp on the fly: if appending this digit would pass 2^31 - 1,
            # the value is out of range and the answer is the boundary in the
            # sign's direction. Checking before extending also bounds the
            # accumulator, so a 200-digit run can never overflow it.
            if total > (2147483647 - digit) // 10:
                return 2147483647 if sign == 1 else -2147483648
            total = total * 10 + digit
            i += 1
        return sign * total
