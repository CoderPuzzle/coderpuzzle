class Solution:
    def nextGreaterElement(self, n: int) -> int:
        # Rearranging n's digits, the answer is the immediate successor of
        # n's digit string among all rearrangements — the classic
        # next-permutation step. Scan from the right for the first digit
        # below its right neighbor (the pivot); none means the digits are
        # entirely non-increasing and n is already the largest arrangement.
        # The suffix past the pivot is non-increasing, so the smallest digit
        # larger than the pivot is the rightmost one that beats it: swap the
        # two, then reverse the (still non-increasing) suffix to sort it
        # ascending — the smallest tail those digits can form.
        digits = list(str(n))
        i = len(digits) - 2
        while i >= 0 and digits[i] >= digits[i + 1]:
            i -= 1
        if i < 0:
            return -1
        j = len(digits) - 1
        while digits[j] <= digits[i]:
            j -= 1
        digits[i], digits[j] = digits[j], digits[i]
        digits[i + 1 :] = reversed(digits[i + 1 :])
        result = int("".join(digits))
        # n reaches 2³¹ - 1 (ten digits) and the successor can run one digit
        # wider, so the rebuilt value must clear the 32-bit ceiling before it
        # is returned; Python's integers are arbitrary-precision, so the
        # rebuild and the check are exact at any width.
        return result if result <= 2147483647 else -1
