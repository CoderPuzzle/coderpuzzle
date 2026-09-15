from typing import List


class Solution:
    def splitMessage(self, message: str, limit: int) -> List[str]:
        # digit_len[i] = total decimal digit count of integers 1..i, so
        # each candidate part count b costs O(1) instead of O(b).
        n = len(message)
        digit_len = [0] * (n + 1)
        for x in range(1, n + 1):
            digit_len[x] = digit_len[x - 1] + len(str(x))
        for b in range(1, n + 1):
            digits_b = len(str(b))
            if 2 * digits_b + 3 > limit:
                break  # the widest suffix "<b/b>" already exceeds the limit
            # Capacity: sum over a=1..b of (limit - len(str(a)) - digits_b - 3).
            capacity = b * limit - digit_len[b] - b * digits_b - 3 * b
            if capacity < n:
                continue
            parts = []
            pos = 0
            for a in range(1, b + 1):
                suffix = f"<{a}/{b}>"
                take = min(limit - len(suffix), n - pos)
                parts.append(message[pos : pos + take] + suffix)
                pos += take
            return parts
        return []
