class Solution:
    def sumBase(self, n: int, k: int) -> int:
        # Repeated division by k peels off one base-k digit at a time;
        # the digits arrive least-significant first but summing is
        # order-free.
        total = 0
        while n:
            total += n % k
            n //= k
        return total
