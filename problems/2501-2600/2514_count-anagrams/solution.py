import math


class Solution:
    def countAnagrams(self, s: str) -> int:
        # Each word independently contributes its multinomial coefficient
        # len! / prod(count!) to a modular product. Division happens through
        # Fermat inverses: for prime p, x^(p-2) is the inverse of x mod p.
        mod = 10**9 + 7
        answer = 1
        for word in s.split(" "):
            counts = [0] * 26
            running_fact = 1
            for index, ch in enumerate(word, 1):
                counts[ord(ch) - ord("a")] += 1
                running_fact = running_fact * index % mod
            term = running_fact
            for count in counts:
                if count > 1:
                    inv = pow(math.factorial(count), mod - 2, mod)
                    term = term * inv % mod
            answer = answer * term % mod
        return answer
