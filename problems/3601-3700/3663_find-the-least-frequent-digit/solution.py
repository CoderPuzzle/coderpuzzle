class Solution:
    def getLeastFrequentDigit(self, n: int) -> int:
        # Count each digit into its bucket by peeling digits off with % and
        # //; the digit itself indexes a fixed array of ten counters.
        counts = [0] * 10
        while n > 0:
            counts[n % 10] += 1
            n //= 10
        # Ascending scan with a strict comparison keeps the smallest digit
        # on ties; empty buckets never qualify.
        best = -1
        for digit in range(10):
            if counts[digit] > 0 and (best == -1 or counts[digit] < counts[best]):
                best = digit
        return best
