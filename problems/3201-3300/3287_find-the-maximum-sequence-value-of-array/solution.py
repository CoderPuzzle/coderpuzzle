from typing import List, Optional


class Solution:
    def maxValue(self, nums: List[int], k: int) -> int:
        n = len(nums)

        def build_prefix():
            # dp[c] = set of OR values achievable with exactly c elements
            dp = [set() for _ in range(k + 1)]
            dp[0].add(0)
            pre = [set() for _ in range(n + 1)]  # pre[j] = ORs of k from first j elements
            for i, x in enumerate(nums):
                top = min(i + 1, k)
                for c in range(top, 0, -1):
                    src = dp[c - 1]
                    if not src:
                        continue
                    dst = dp[c]
                    for m in src:
                        dst.add(m | x)
                pre[i + 1] = set(dp[k])
            return pre

        def build_suffix():
            dp = [set() for _ in range(k + 1)]
            dp[0].add(0)
            suf = [set() for _ in range(n + 1)]  # suf[i] = ORs of k from nums[i:]
            for i in range(n - 1, -1, -1):
                x = nums[i]
                top = min(n - i, k)
                for c in range(top, 0, -1):
                    src = dp[c - 1]
                    if not src:
                        continue
                    dst = dp[c]
                    for m in src:
                        dst.add(m | x)
                suf[i] = set(dp[k])
            return suf

        pre = build_prefix()
        suf = build_suffix()
        ans = 0
        for i in range(k, n - k + 1):
            for a in pre[i]:
                for b in suf[i]:
                    v = a ^ b
                    if v > ans:
                        ans = v
        return ans
