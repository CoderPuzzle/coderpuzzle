class Solution:
    def sumOfLargestPrimes(self, s: str) -> int:
        # Collect distinct substring values (leading zeros vanish on parse),
        # walk them from the largest down, and primality-test each by trial
        # division until three primes have been summed.
        values = set()
        for i in range(len(s)):
            for j in range(i + 1, len(s) + 1):
                values.add(int(s[i:j]))

        def is_prime(v: int) -> bool:
            if v < 2:
                return False
            if v % 2 == 0:
                return v == 2
            f = 3
            while f * f <= v:
                if v % f == 0:
                    return False
                f += 2
            return True

        total = 0
        found = 0
        for v in sorted(values, reverse=True):
            if is_prime(v):
                total += v
                found += 1
                if found == 3:
                    break
        return total
