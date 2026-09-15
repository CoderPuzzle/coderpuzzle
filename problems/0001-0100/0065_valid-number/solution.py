class Solution:
    def isNumber(self, s: str) -> bool:
        # One left-to-right scan over the grammar's skeleton: sign, mantissa
        # (integer or decimal), optional exponent. seen_digit is scoped to the
        # part being read — the mantissa first, then the exponent after the
        # 'e'/'E' resets it.
        seen_digit = seen_dot = seen_exp = False
        for i, c in enumerate(s):
            if "0" <= c <= "9":
                seen_digit = True
            elif c in "+-":
                # A sign is legal only at the very start or right after 'e'/'E'.
                if i > 0 and s[i - 1] not in "eE":
                    return False
            elif c == ".":
                # At most one dot, and only in the mantissa: the exponent is an integer.
                if seen_dot or seen_exp:
                    return False
                seen_dot = True
            elif c in "eE":
                # At most one exponent, and only after the mantissa has shown a digit.
                if seen_exp or not seen_digit:
                    return False
                seen_exp = True
                seen_digit = False
            else:
                # Any other character (every letter but e/E) is invalid.
                return False
        # The last part read must have contained at least one digit.
        return seen_digit
