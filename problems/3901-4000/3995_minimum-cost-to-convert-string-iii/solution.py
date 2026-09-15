class Solution:
    def minCost(self, source: str, target: str, rules: list[list[str]], costs: list[int]) -> int:
        n = len(source)
        inf = 10**18
        dp = [inf] * (n + 1)
        dp[0] = 0
        for i in range(n):
            if dp[i] == inf:
                continue
            if source[i] == target[i]:
                dp[i + 1] = min(dp[i + 1], dp[i])
            for (p, r), c in zip(rules, costs):
                z = len(p)
                if (
                    i + z <= n
                    and r == target[i : i + z]
                    and all(a == "*" or a == b for a, b in zip(p, source[i : i + z]))
                ):
                    dp[i + z] = min(dp[i + z], dp[i] + c + p.count("*"))
        return -1 if dp[n] == inf else dp[n]
