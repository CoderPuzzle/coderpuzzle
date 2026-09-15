from typing import List


class Solution:
    def countDivisibleSubstrings(self, word: str) -> int:
        digit = "11222333444555666777788899"
        n = len(word)
        pre = [0] * (n + 1)
        for i in range(n):
            pre[i + 1] = pre[i] + int(digit[ord(word[i]) - 97])
        count = 0
        for start in range(n):
            for end in range(start + 1, n + 1):
                if (pre[end] - pre[start]) % (end - start) == 0:
                    count += 1
        return count
