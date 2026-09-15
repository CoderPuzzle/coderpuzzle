class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        # The first two numbers fix the whole sequence, so try each split of
        # them and let string addition verify the remainder. No machine
        # integers anywhere: rejected candidates can outgrow 64 bits.
        n = len(num)

        def valid(segment: str) -> bool:
            # Multi-digit numbers may not open with '0'; a lone 0 is legal.
            return len(segment) == 1 or segment[0] != "0"

        def add(a: str, b: str) -> str:
            # Schoolbook addition on digit characters, least significant
            # first, carrying as we go.
            digits = []
            carry = 0
            i, j = len(a) - 1, len(b) - 1
            while i >= 0 or j >= 0 or carry:
                total = carry
                if i >= 0:
                    total += ord(a[i]) - ord("0")
                    i -= 1
                if j >= 0:
                    total += ord(b[j]) - ord("0")
                    j -= 1
                digits.append(chr(total % 10 + ord("0")))
                carry = total // 10
            return "".join(reversed(digits))

        def consumes(first: str, second: str, rest: str) -> bool:
            # Greedy walk: the next number's digits are exactly the sum's
            # digits, so its length is never a choice.
            while rest:
                total = add(first, second)
                if not rest.startswith(total):
                    return False
                first, second, rest = second, total, rest[len(total) :]
            return True

        for i in range(1, n):
            for j in range(i + 1, n):
                # j < n leaves at least one digit for the third number.
                if valid(num[:i]) and valid(num[i:j]) and consumes(num[:i], num[i:j], num[j:]):
                    return True
        return False
