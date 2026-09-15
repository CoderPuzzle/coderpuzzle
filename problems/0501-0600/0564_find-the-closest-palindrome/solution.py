class Solution:
    def nearestPalindromic(self, n: str) -> str:
        # A palindrome is fixed by its first half, so the palindromes
        # nearest n nearly share n's own half: mirror the half, and the
        # half +/- 1, for at most three same-width candidates. The +/- 1
        # step can leave the width (10...0 decremented, 9...9 incremented);
        # those neighbors are the boundary candidates 10^(L-1) - 1 (all 9s,
        # one digit shorter) and 10^L + 1 (1, zeros, 1).
        length = len(n)
        half = (length + 1) // 2
        prefix = int(n[:half])
        candidates = []
        for delta in (-1, 0, 1):
            shifted = str(prefix + delta)
            # A half that no longer has exactly `half` digits would mirror
            # onto leading zeros - the boundary candidates own that ground.
            if len(shifted) != half or (shifted == "0" and length > 1):
                continue
            candidates.append(shifted + shifted[: length - half][::-1])
        candidates.append("0" if length == 1 else "9" * (length - 1))
        candidates.append("1" + "0" * (length - 1) + "1")

        # Everything fits a signed 64-bit integer: n is below 10^18, the
        # widest candidate is 10^18 + 1, and no distance passes
        # 9 * 10^17 + 1 - an order of magnitude inside int64's
        # 9.22 * 10^18 ceiling (Python's integers are unbounded anyway).
        value = int(n)
        best = None
        best_value = 0
        best_distance = 0
        for candidate in candidates:
            candidate_value = int(candidate)
            if candidate_value == value:
                continue  # n itself never counts
            distance = abs(candidate_value - value)
            if best is None or distance < best_distance or (distance == best_distance and candidate_value < best_value):
                best = candidate
                best_value = candidate_value
                best_distance = distance
        return best
