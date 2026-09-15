class Solution:
    def splitString(self, s: str) -> bool:
        # Fixing the first piece forces everything after it: each next piece
        # must read as exactly prev - 1. Leading zeros let several lengths
        # share one value, so backtrack over each matching length. A first
        # piece of 11+ digits cannot work: its successor alone needs 10+
        # of the at most 9 leftover characters.
        n = len(s)

        def extend(pos, prev):
            want = prev - 1
            if pos == n:
                return True
            if want < 0:
                return False
            v = 0
            for end in range(pos + 1, n + 1):
                v = v * 10 + int(s[end - 1])
                if v == want and extend(end, want):
                    return True
                if v > want:
                    break
            return False

        return any(extend(first_end, int(s[:first_end])) for first_end in range(1, min(n, 11)))
