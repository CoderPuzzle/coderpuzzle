class Solution:
    def confusingNumberII(self, n: int) -> int:
        # DFS over the valid digits (0,1,6,8,9; no leading zero), pruning
        # once the value exceeds n. The rotated value is carried
        # incrementally: appending digit d to a k-digit value shifts the
        # old rotation one place left and prepends rot180(d).
        digits = (0, 1, 6, 8, 9)
        rot = (0, 1, -1, -1, -1, -1, 9, -1, 8, 6)
        pow10 = [1]
        for _ in range(10):
            pow10.append(pow10[-1] * 10)
        count = 0

        def dfs(cur: int, rotated: int, ndigits: int) -> None:
            nonlocal count
            if cur > n:
                return
            if cur > 0 and rotated != cur:
                count += 1
            for d in digits:
                if cur == 0 and d == 0:
                    continue
                nxt = cur * 10 + d
                if nxt <= n:
                    dfs(nxt, rot[d] * pow10[ndigits] + rotated, ndigits + 1)

        dfs(0, 0, 0)
        return count
