class Solution:
    def countLargestGroup(self, n: int) -> int:
        # Digit sums stay below 37 for n <= 10^4, so a fixed array replaces
        # a hash map: bucket every value by its digit sum, then count the
        # buckets reaching the maximum.
        counts = [0] * 37
        best = 0
        for value in range(1, n + 1):
            digit_sum = 0
            rest = value
            while rest:
                digit_sum += rest % 10
                rest //= 10
            counts[digit_sum] += 1
            if counts[digit_sum] > best:
                best = counts[digit_sum]
        return sum(1 for count in counts if count == best)
