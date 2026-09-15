from typing import List


class Solution:
    def countCompleteSubstrings(self, word: str, k: int) -> int:
        n = len(word)
        vals = [ord(c) - 97 for c in word]
        total = 0
        start = 0
        while start < n:
            end = start + 1
            while end < n and abs(vals[end] - vals[end - 1]) <= 2:
                end += 1
            seg_len = end - start
            for m in range(1, 27):
                length = m * k
                if length > seg_len:
                    break
                cnt = [0] * 26
                bad = 0  # letters whose count is neither 0 nor k
                for i in range(start, start + length):
                    c = vals[i]
                    old = cnt[c]
                    if old + 1 == k:
                        if old != 0:
                            bad -= 1  # 1..k-1 (invalid) -> k (valid)
                    elif old == 0 or old == k:
                        bad += 1  # valid -> invalid
                    cnt[c] = old + 1
                if bad == 0:
                    total += 1
                left = start
                for right in range(start + length, end):
                    c = vals[right]
                    old = cnt[c]
                    if old + 1 == k:
                        if old != 0:
                            bad -= 1
                    elif old == 0 or old == k:
                        bad += 1
                    cnt[c] = old + 1
                    c = vals[left]
                    old = cnt[c]
                    new = old - 1
                    cnt[c] = new
                    if new == k:
                        bad -= 1  # k+1 (invalid) -> k (valid)
                    elif new == 0:
                        if k > 1:
                            bad -= 1  # 1 (invalid) -> 0 (valid)
                    elif new + 1 == k:
                        bad += 1  # k (valid) -> k-1 (invalid)
                    left += 1
                    if bad == 0:
                        total += 1
            start = end
        return total
