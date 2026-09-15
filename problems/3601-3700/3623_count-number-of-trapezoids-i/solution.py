from typing import List


class Solution:
    def countTrapezoids(self, points: List[List[int]]) -> int:
        mod = 10**9 + 7
        # A horizontal trapezoid is exactly: two points on one horizontal
        # line and two on another. Count each line's pairs, then combine.
        rows = {}
        for _, y in points:
            rows[y] = rows.get(y, 0) + 1
        # Per-line pair counts s = C(c, 2) reach ~5e9, past 32 bits, and
        # the pair products range far past 64 bits — reduce modulo the
        # prime as every value is produced.
        total = 0
        squared = 0
        for count in rows.values():
            pairs = count * (count - 1) // 2 % mod
            total = (total + pairs) % mod
            squared = (squared + pairs * pairs) % mod
        # The sum over line pairs s_i * s_j equals (total^2 - squared)/2;
        # dividing by 2 becomes multiplying by the inverse of 2.
        inv2 = (mod + 1) // 2
        return (total * total - squared) * inv2 % mod
