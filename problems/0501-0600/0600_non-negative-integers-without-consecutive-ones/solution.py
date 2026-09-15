from typing import List


class Solution:
    def findIntegers(self, n: int) -> int:
        s = bin(n)[2:]
        m = len(s)
        # fib[i] = number of binary strings of length i with no consecutive 1s
        fib = [0] * (m + 2)
        fib[0] = 1
        fib[1] = 2
        for i in range(2, m + 1):
            fib[i] = fib[i - 1] + fib[i - 2]
        res = 0
        for i, ch in enumerate(s):
            if ch == "1":
                # place 0 here, suffix can be anything without consecutive ones
                res += fib[m - i - 1]
                if i > 0 and s[i - 1] == "1":
                    # n itself already contains consecutive ones; stop counting
                    return res
        return res + 1  # count n itself (its binary has no consecutive ones)
