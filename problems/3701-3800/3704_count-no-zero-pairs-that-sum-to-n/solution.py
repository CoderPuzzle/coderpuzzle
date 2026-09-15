from typing import List, Optional

MOD = 10**9 + 7


class Solution:
    def countNoZeroPairs(self, n: int) -> int:
        digits = [int(c) for c in str(n)][::-1] + [0]
        length = len(digits)

        # g[pos][carry][a_active][b_active]
        g = [[[0] * 2 for _ in range(2)] for _ in range(2)]
        g[0][0][0] = 1
        for pos in range(length - 1, -1, -1):
            ng = [[[0] * 2 for _ in range(2)] for _ in range(2)]
            for carry in range(2):
                for aa in range(2):
                    for ba in range(2):
                        res = 0
                        da_range = range(10) if aa else (0,)
                        db_range = range(10) if ba else (0,)
                        for da in da_range:
                            for db in db_range:
                                if pos == 0 and (da == 0 or db == 0):
                                    continue
                                s = da + db + carry
                                if s % 10 != digits[pos]:
                                    continue
                                nc = s // 10
                                res += g[nc][aa and da != 0][ba and db != 0]
                        ng[carry][aa][ba] = res % MOD
            g = ng
        return g[0][1][1]
