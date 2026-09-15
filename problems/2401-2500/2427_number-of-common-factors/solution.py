class Solution:
    def commonFactors(self, a: int, b: int) -> int:
        # A common factor divides both numbers, hence their gcd; every
        # divisor of the gcd divides both. So the answer is the divisor
        # count of g = gcd(a, b): pair each d <= sqrt(g) dividing g with
        # its cofactor g / d (a perfect square pairs only once).
        while b:
            a, b = b, a % b
        g = a
        count = 0
        d = 1
        while d * d <= g:
            if g % d == 0:
                count += 1 if d * d == g else 2
            d += 1
        return count
