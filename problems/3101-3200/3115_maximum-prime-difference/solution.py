class Solution:
    def maximumPrimeDifference(self, nums: List[int]) -> int:
        # One pass keeping the first and the last prime-bearing index; the
        # answer is their distance. Primality by trial division is cheap
        # because values never exceed 100 (at most 9 divisor probes).
        def is_prime(v: int) -> bool:
            if v < 2:
                return False
            d = 2
            while d * d <= v:
                if v % d == 0:
                    return False
                d += 1
            return True

        first = -1
        last = -1
        for i, v in enumerate(nums):
            if is_prime(v):
                if first == -1:
                    first = i
                last = i
        return last - first
