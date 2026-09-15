from typing import List


class Solution:
    def avoidFlood(self, rains: List[int]) -> List[int]:
        n = len(rains)
        nxt = list(range(n + 2))

        def find(x: int) -> int:
            root = x
            while nxt[root] != root:
                root = nxt[root]
            while nxt[x] != root:
                nxt[x], x = root, nxt[x]
            return root

        last: dict = {}
        ans = [-1] * n
        for i, r in enumerate(rains):
            if r == 0:
                ans[i] = 1
            else:
                nxt[i] = i + 1
                if r in last:
                    j = find(last[r] + 1)
                    if j >= i:
                        return []
                    ans[j] = r
                    nxt[j] = j + 1
                last[r] = i
        return ans
