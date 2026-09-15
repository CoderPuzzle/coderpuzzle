class Solution:
    def smallestNumber(self, n: str) -> str:
        # The wire carries n as decimal text: it reaches 10^18, beyond the
        # exact double range of the JS family (see problem.json).
        value = int(n)
        if value == 1:
            return "1"
        # Largest-first trial division packs the factors into as few digits
        # as possible and leaves the smallest remainders behind, so reading
        # the buckets in ascending digit order yields the smallest number.
        counts = [0] * 10
        for digit in range(9, 1, -1):
            while value % digit == 0:
                counts[digit] += 1
                value //= digit
        if value != 1:
            return "-1"
        return "".join(str(digit) * counts[digit] for digit in range(2, 10))
