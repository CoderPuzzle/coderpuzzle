class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not t or len(t) > len(s):
            return ""
        text = [ord(ch) for ch in s]
        quota = {}
        for ch in t:
            quota[ord(ch)] = quota.get(ord(ch), 0) + 1
        kinds = len(quota)

        def covers(length: int) -> int:
            # Slide one window of exactly `length` across s. `short` counts
            # demanded letters still below quota, so short == 0 means this
            # window covers t; letters absent from t never touch it.
            have = dict.fromkeys(quota, 0)
            short = kinds
            for code in text[:length]:
                need = quota.get(code)
                if need:
                    have[code] += 1
                    if have[code] == need:
                        short -= 1
            if short == 0:
                return 0
            for start in range(1, len(s) - length + 1):
                code = text[start + length - 1]
                need = quota.get(code)
                if need:
                    have[code] += 1
                    if have[code] == need:
                        short -= 1
                code = text[start - 1]
                need = quota.get(code)
                if need:
                    # Dropping from exactly-at-quota to one short reopens
                    # the debt; deeper surpluses change nothing.
                    if have[code] == need:
                        short += 1
                    have[code] -= 1
                if short == 0:
                    return start
            return -1

        # Coverage is monotone in the length: a covering window of length
        # L sits inside a covering window of length L + 1, so "some window
        # of length L covers t" is false below the answer and true from it
        # upward. Binary search for the smallest surviving length.
        lo, hi = len(t), len(s)
        best_start, best_len = -1, -1
        while lo <= hi:
            mid = (lo + hi) // 2
            start = covers(mid)
            if start >= 0:
                best_start, best_len = start, mid
                hi = mid - 1
            else:
                lo = mid + 1
        # Within the minimal length the scan reports the leftmost cover,
        # the same window the shrinking sweep settles on.
        return "" if best_len < 0 else s[best_start : best_start + best_len]
