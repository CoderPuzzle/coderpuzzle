from typing import List
import cmath
import math


class Solution:
    def multiply(self, poly1: List[int], poly2: List[int]) -> List[int]:
        # Schoolbook multiplication is 2.5 * 10^9 products at the constraint
        # limits, so the product is computed with an iterative radix-2 FFT
        # over doubles: pad to a power of two, transform both polynomials,
        # multiply pointwise, transform back, round. Rounding is exact
        # here -- with coefficients bounded by 10^3 and lengths by 5*10^4
        # the largest product coefficient is 5*10^10, and the double-FFT
        # error bound (sum of squared inputs < 9*10^14, here 10^11) keeps
        # the error far below the 0.5 rounding threshold. Results reach
        # 5*10^10, past 32-bit range, so coefficients are 64-bit.
        result_len = len(poly1) + len(poly2) - 1
        n = 1
        while n < result_len:
            n <<= 1
        fa = [complex(x, 0.0) for x in poly1] + [complex(0.0, 0.0)] * (n - len(poly1))
        fb = [complex(x, 0.0) for x in poly2] + [complex(0.0, 0.0)] * (n - len(poly2))

        def fft(a: List[complex], invert: bool) -> None:
            size = len(a)
            j = 0
            for i in range(1, size):
                bit = size >> 1
                while j & bit:
                    j ^= bit
                    bit >>= 1
                j |= bit
                if i < j:
                    a[i], a[j] = a[j], a[i]
            length = 2
            while length <= size:
                ang = (2.0 * math.pi / length) * (1.0 if invert else -1.0)
                step = cmath.exp(complex(0.0, ang))
                half = length >> 1
                for i in range(0, size, length):
                    w = complex(1.0, 0.0)
                    for k in range(i, i + half):
                        u = a[k]
                        v = a[k + half] * w
                        a[k] = u + v
                        a[k + half] = u - v
                        w *= step
                length <<= 1
            if invert:
                inv = 1.0 / size
                for i in range(size):
                    a[i] *= inv

        fft(fa, False)
        fft(fb, False)
        for i in range(n):
            fa[i] *= fb[i]
        fft(fa, True)
        return [int(round(fa[i].real)) for i in range(result_len)]
