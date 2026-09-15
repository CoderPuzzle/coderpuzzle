class Solution:
    def sumOfPrimesInRange(self, n: int) -> int:
        limit = 1000
        is_prime = [True] * (limit + 1)
        is_prime[0] = is_prime[1] = False
        for p in range(2, int(limit**0.5) + 1):
            if is_prime[p]:
                for multiple in range(p * p, limit + 1, p):
                    is_prime[multiple] = False

        prefix = [0] * (limit + 1)
        for value in range(1, limit + 1):
            prefix[value] = prefix[value - 1] + (value if is_prime[value] else 0)

        reverse = 0
        remaining = n
        while remaining:
            reverse = reverse * 10 + remaining % 10
            remaining //= 10

        low = min(n, reverse)
        high = max(n, reverse)
        return prefix[high] - prefix[low - 1]
