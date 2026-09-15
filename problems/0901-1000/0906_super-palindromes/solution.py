class Solution:
    def superpalindromesInRange(self, left: str, right: str) -> int:
        # The square root of a super-palindrome is itself a palindrome, so
        # the candidates come from the roots, never from the values: build
        # every palindromic root of up to nine digits by mirroring a half,
        # square it, and keep the squares that are palindromes inside the
        # range. Nine digits of root suffice because right is below 10^18
        # and the root of anything below 10^18 is below 10^9.
        low = int(left)
        high = int(right)
        count = 0
        for length in range(1, 10):
            half_length = (length + 1) // 2
            for half in range(10 ** (half_length - 1), 10**half_length):
                digits = str(half)
                root = digits + digits[: length - half_length][::-1]
                square = int(root) ** 2
                # Roots ascend across widths and halves alike, so squares
                # do too: the first square above `high` ends the scan.
                if square > high:
                    return count
                if square >= low and str(square) == str(square)[::-1]:
                    count += 1
        return count
