class Solution:
    def differenceOfSums(self, n: int, m: int) -> int:
        # [1, n] splits into two arithmetic progressions: the multiples of
        # m are m, 2m, ..., km with k = n // m and sum m * k * (k + 1) / 2,
        # while num1 is the full progression 1..n minus those multiples.
        k = n // m
        num2 = m * k * (k + 1) // 2
        num1 = n * (n + 1) // 2 - num2
        # n <= 1000 keeps every intermediate <= 1001000, far inside 32 bits.
        return num1 - num2
