from typing import List, Optional


class Solution:
    def count(self, num1: str, num2: str, min_sum: int, max_sum: int) -> int:
        MOD = 10**9 + 7

        def count_range(s):
            digits = [int(c) for c in s]
            m = len(digits)
            ms = max_sum
            # dp[tight][sum] = ways to fill remaining positions
            dp = [[0] * (ms + 1) for _ in range(2)]
            for sm in range(ms + 1):
                v = 1 if sm >= min_sum else 0
                dp[0][sm] = v
                dp[1][sm] = v
            for pos in range(m - 1, -1, -1):
                ndp = [[0] * (ms + 1) for _ in range(2)]
                for tight in range(2):
                    limit = digits[pos] if tight else 9
                    for sm in range(ms + 1):
                        total = 0
                        for d in range(limit + 1):
                            ns = sm + d
                            if ns > ms:
                                break
                            nt = 1 if (tight and d == limit) else 0
                            total += dp[nt][ns]
                        ndp[tight][sm] = total % MOD
                dp = ndp
            return dp[1][0]

        def decrement(s):
            arr = list(s)
            i = len(arr) - 1
            while i >= 0 and arr[i] == "0":
                arr[i] = "9"
                i -= 1
            arr[i] = chr(ord(arr[i]) - 1)
            res = "".join(arr).lstrip("0")
            return res if res else "0"

        return (count_range(num2) - count_range(decrement(num1))) % MOD
