class Solution:
    def totalWaviness(self, num1: int, num2: int) -> int:
        # Waviness of one number: an interior digit is a peak when it is
        # strictly greater than both neighbors and a valley when it is
        # strictly less than both; equal neighbors never count.
        def waviness(n: int) -> int:
            if n < 100:
                return 0
            prev = n % 10  # least significant digit so far
            n //= 10
            cur = n % 10
            n //= 10
            w = 0
            while True:
                nxt = n % 10
                if (cur > prev and cur > nxt) or (cur < prev and cur < nxt):
                    w += 1
                prev, cur = cur, nxt
                n //= 10
                if n == 0:
                    break
            return w

        # The range holds at most 10^5 numbers of at most 6 digits each,
        # so the plain enumeration the hint suggests is plenty.
        return sum(waviness(x) for x in range(num1, num2 + 1))
