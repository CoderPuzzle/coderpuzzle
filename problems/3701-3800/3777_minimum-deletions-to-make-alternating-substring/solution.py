from typing import List


class Solution:
    def minDeletions(self, s: str, queries: List[List[int]]) -> List[int]:
        # eq[i] = 1 iff i >= 1 and s[i] == s[i - 1]. Deleting one character
        # per equal adjacent pair is optimal, so the type-2 answer over
        # s[l..r] is exactly sum(eq[l+1..r]). A Fenwick tree over eq answers
        # each query in O(log n), and flipping s[j] only ever changes eq[j]
        # and eq[j + 1], because every other adjacency is untouched.
        n = len(s)
        cur = [0] * n
        bits = [0] * n

        def add(i, delta):
            while i < n:
                bits[i] += delta
                i += i & -i

        def pref(i):
            total = 0
            while i > 0:
                total += bits[i]
                i -= i & -i
            return total

        def set_eq(i, value):
            if 1 <= i < n and cur[i] != value:
                add(i, value - cur[i])
                cur[i] = value

        for i in range(1, n):
            cur[i] = 1 if s[i] == s[i - 1] else 0
            if cur[i]:
                add(i, 1)
        chars = list(s)
        answer = []
        for query in queries:
            if query[0] == 1:
                j = query[1]
                chars[j] = "A" if chars[j] == "B" else "B"
                if j + 1 < n:
                    set_eq(j + 1, 1 if chars[j + 1] == chars[j] else 0)
                set_eq(j, 1 if j >= 1 and chars[j] == chars[j - 1] else 0)
            else:
                l, r = query[1], query[2]
                answer.append(pref(r) - pref(l))
        return answer
