class Solution:
    def numPrimeArrangements(self, n: int) -> int:
        MOD = 10**9 + 7

        # Sieve of Eratosthenes up to n.
        is_prime = [True] * (n + 1)
        is_prime[0] = False
        if n >= 1:
            is_prime[1] = False
        p = 2
        while p * p <= n:
            if is_prime[p]:
                for multiple in range(p * p, n + 1, p):
                    is_prime[multiple] = False
            p += 1
        primes = sum(is_prime)

        # Primes may permute over prime indices; everything else (1 and
        # the composites) permutes over the rest. Independent choices.
        result = 1
        for k in range(2, primes + 1):
            result = result * k % MOD
        for k in range(2, n - primes + 1):
            result = result * k % MOD
        return result
