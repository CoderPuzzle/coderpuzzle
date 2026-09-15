from typing import List, Optional

from functools import lru_cache


class Solution:
    def findGoodStrings(self, n: int, s1: str, s2: str, evil: str) -> int:
        MOD = 10**9 + 7
        m = len(evil)
        fail = [0] * m
        k = 0
        for i in range(1, m):
            while k > 0 and evil[i] != evil[k]:
                k = fail[k - 1]
            if evil[i] == evil[k]:
                k += 1
            fail[i] = k

        def advance(state, ch):
            while state > 0 and evil[state] != ch:
                state = fail[state - 1]
            if evil[state] == ch:
                state += 1
            return state

        @lru_cache(maxsize=None)
        def dfs(pos, state, lo, hi):
            # lo: prefix built so far equals s1[:pos]; hi: prefix equals s2[:pos].
            if state == m:
                return 0
            if pos == n:
                return 1
            low_char = s1[pos] if lo else "a"
            high_char = s2[pos] if hi else "z"
            total = 0
            for code in range(ord(low_char), ord(high_char) + 1):
                ch = chr(code)
                nxt_state = advance(state, ch)
                if nxt_state == m:
                    continue
                total += dfs(pos + 1, nxt_state, lo and ch == s1[pos], hi and ch == s2[pos])
            return total % MOD

        return dfs(0, 0, True, True) % MOD
