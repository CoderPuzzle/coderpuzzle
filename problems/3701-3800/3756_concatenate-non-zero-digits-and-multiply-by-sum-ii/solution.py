from typing import List


class Solution:
    def sumAndMultiply(self, s: str, queries: List[List[int]]) -> List[int]:
        # Prefix arrays over the NON-ZERO digits: pref_val keeps the value
        # mod M of concatenating them, pref_sum their digit sum, pref_cnt
        # their count. The compressed substring s[l..r] is the slice of the
        # non-zero sequence between indexes cnt[l] and cnt[r+1]; its value is
        # recoverable from the two prefix values with one pow10 shift, and
        # its digit sum is a plain prefix difference (zeros add 0 to both).
        MOD = 1_000_000_007
        n = len(s)
        pref_val = [0] * (n + 1)
        pref_sum = [0] * (n + 1)
        pref_cnt = [0] * (n + 1)
        pow10 = [1] * (n + 1)
        for i, ch in enumerate(s):
            d = ord(ch) - 48
            pref_val[i + 1] = pref_val[i]
            pref_sum[i + 1] = pref_sum[i] + d
            pref_cnt[i + 1] = pref_cnt[i]
            pow10[i + 1] = pow10[i] * 10 % MOD
            if ch != "0":
                pref_val[i + 1] = (pref_val[i] * 10 + d) % MOD
                pref_cnt[i + 1] += 1
        answer = []
        for l, r in queries:
            k = pref_cnt[r + 1] - pref_cnt[l]
            # x = the concatenation of the k non-zero digits in s[l..r];
            # pref_val[r+1] = pref_val[l] * 10^k + x, so solve for x.
            x = (pref_val[r + 1] - pref_val[l] * pow10[k]) % MOD
            digit_sum = pref_sum[r + 1] - pref_sum[l]
            answer.append(x * digit_sum % MOD)
        return answer
