class Solution:
    def completePrime(self, num: int) -> bool:
        # Test every prefix and every suffix for primality with trial
        # division on the 6k +- 1 wheel. At most ten digits means at most
        # eighteen slices, and each slice costs at most ~sqrt(num) / 3
        # division steps, so no sieve is ever needed.
        digits = []
        m = num
        while m > 0:
            digits.append(m % 10)
            m //= 10
        count = len(digits)

        def prime(value: int) -> bool:
            if value < 2:
                return False
            if value < 4:
                return True
            if value % 2 == 0 or value % 3 == 0:
                return False
            d = 5
            while d * d <= value:
                if value % d == 0 or value % (d + 2) == 0:
                    return False
                d += 6
            return True

        # prefixes: the first k digits, most-significant first; suffixes:
        # the last k digits. Both scans include the whole number itself.
        for k in range(count):
            if not prime(num // 10 ** (count - 1 - k)):
                return False
        for k in range(1, count):
            if not prime(num % 10**k):
                return False
        return True
