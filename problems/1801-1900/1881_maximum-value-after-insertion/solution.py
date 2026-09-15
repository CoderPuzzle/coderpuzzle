class Solution:
    def maxValue(self, n: str, x: int) -> str:
        # Positive: insert before the first digit < x (else append).
        # Negative: insert before the first digit > x (else append).
        d = str(x)
        if n[0] == "-":
            for i in range(1, len(n)):
                if int(n[i]) > x:
                    return n[:i] + d + n[i:]
            return n + d
        for i in range(len(n)):
            if int(n[i]) < x:
                return n[:i] + d + n[i:]
        return n + d
