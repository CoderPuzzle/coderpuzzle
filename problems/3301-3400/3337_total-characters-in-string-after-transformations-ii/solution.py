from typing import List, Optional


class Solution:
    @staticmethod
    def _mat_mul(a, b):
        size = len(a)
        c = [[0] * size for _ in range(size)]
        for i in range(size):
            for k in range(size):
                aik = a[i][k]
                if not aik:
                    continue
                row_b = b[k]
                row_c = c[i]
                for j in range(size):
                    row_c[j] = (row_c[j] + aik * row_b[j]) % (10**9 + 7)
        return c

    @staticmethod
    def _mat_pow(base, exp):
        size = len(base)
        result = [[1 if i == j else 0 for j in range(size)] for i in range(size)]
        while exp:
            if exp & 1:
                result = Solution._mat_mul(result, base)
            base = Solution._mat_mul(base, base)
            exp >>= 1
        return result

    def lengthAfterTransformations(self, s: str, t: int, nums: List[int]) -> int:
        MOD = 10**9 + 7
        v = [0] * 26
        for ch in s:
            v[ord(ch) - 97] += 1

        # transition[i][j] = 1 if character j produces character i.
        transition = [[0] * 26 for _ in range(26)]
        for j in range(26):
            for a in range(1, nums[j] + 1):
                transition[(j + a) % 26][j] = 1

        powered = self._mat_pow(transition, t)
        total = 0
        for i in range(26):
            s_i = 0
            for j in range(26):
                s_i += powered[i][j] * v[j]
            total = (total + s_i) % MOD
        return total
