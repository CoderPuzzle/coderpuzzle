from typing import List


class Solution:
    def countKConstraintSubstrings(self, s: str, k: int, queries: List[List[int]]) -> List[int]:
        n = len(s)
        left = 0
        zeros = ones = 0
        bounds = [0] * n
        for right, ch in enumerate(s):
            if ch == "0":
                zeros += 1
            else:
                ones += 1
            while zeros > k and ones > k:
                if s[left] == "0":
                    zeros -= 1
                else:
                    ones -= 1
                left += 1
            bounds[right] = left
        pre = [0] * (n + 1)
        for j in range(n):
            pre[j + 1] = pre[j] + j + 1 - bounds[j]
        nxt = [n] * n
        ptr = n
        for l in range(n - 1, -1, -1):
            while ptr > 0 and bounds[ptr - 1] >= l:
                ptr -= 1
            nxt[l] = ptr
        answer: List[int] = []
        for l, r in queries:
            j = nxt[l]
            if j > r:
                m = r - l + 1
                answer.append(m * (m + 1) // 2)
            else:
                d = j - l
                answer.append(pre[r + 1] - pre[j] + d * (d + 1) // 2)
        return answer
