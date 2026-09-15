class Solution:
    def concatHex36(self, n: int) -> str:
        # One alphabet serves both bases: base 16 stops at 'F', base 36 at 'Z'.
        alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        def to_base(x: int, b: int) -> str:
            # n >= 1 makes x >= 1, so the loop always emits at least one digit.
            digits = []
            while x:
                digits.append(alphabet[x % b])
                x //= b
            # Digits come out lowest-first, so reverse for the answer.
            return "".join(reversed(digits))

        return to_base(n * n, 16) + to_base(n * n * n, 36)
