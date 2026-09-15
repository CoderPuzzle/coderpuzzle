class Solution:
    def nthMagicalNumber(self, n: int, a: int, b: int) -> int:
        # Divisible by a or b, so inclusion-exclusion counts the magical
        # numbers up to x as x//a + x//b - x//lcm(a, b) — the overlap
        # holds exactly the multiples of the least common multiple. That
        # count never decreases and rises by one exactly on magical
        # numbers, so the nth magical number is the smallest x whose
        # count reaches n. Binary search over [1, n*min(a, b)] finds it —
        # the top is the nth multiple of the smaller value, itself
        # magical, so it is a valid ceiling. The found value is returned
        # modulo 10**9 + 7.
        x, y = a, b
        while y:
            x, y = y, x % y
        lcm = a // x * b
        lo, hi = 1, n * min(a, b)
        while lo < hi:
            mid = (lo + hi) // 2
            if mid // a + mid // b - mid // lcm >= n:
                hi = mid
            else:
                lo = mid + 1
        return lo % 1_000_000_007
