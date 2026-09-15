class Solution:
    def sortString(self, s: str) -> str:
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        remaining = len(s)
        result = []
        forward = True
        while remaining > 0:
            order = range(26) if forward else range(25, -1, -1)
            for i in order:
                if counts[i] > 0:
                    counts[i] -= 1
                    remaining -= 1
                    result.append(chr(ord("a") + i))
            forward = not forward
        return "".join(result)
