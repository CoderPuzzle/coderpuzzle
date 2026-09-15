class Solution:
    def sumFourDivisors(self, nums: List[int]) -> int:
        # Divisors pair up around the square root, so one scan to isqrt(n)
        # sees them all: each hit contributes d and n//d (collapsed to one
        # when d*d == n). Track count and sum together and add the sum only
        # for numbers landing on exactly four divisors.
        total = 0
        for n in nums:
            count = 0
            div_sum = 0
            d = 1
            while d * d <= n:
                if n % d == 0:
                    count += 2 if d * d != n else 1
                    div_sum += d
                    if d * d != n:
                        div_sum += n // d
                d += 1
            if count == 4:
                total += div_sum
        return total
