from typing import List


class Solution:
    def minimumCost(self, target: str, words: List[str], costs: List[int]) -> int:
        # Forward DP over prefixes: dp[i] is the minimum cost to assemble
        # target[:i], dp[0] is 0, and every reachable position extends each
        # DISTINCT word matching its next characters. Duplicate words first
        # collapse to their cheapest occurrence. The Easy bounds are small —
        # at most 50 words against a target of at most 2000 characters — so
        # a direct scan of all words at all positions suffices; greedy
        # longest-match fails (a pricey long word can block cheaper short
        # ones), and an unreachable dp[n] is the -1 case. str.startswith
        # runs the match test without slicing and never reads past the end,
        # so words longer than the remaining suffix are rejected safely.
        # Costs accumulate in wide room even though any achievable cost is
        # at most len(target) * max(cost) <= 2 * 10^8, which fits an int.
        best = {}
        for word, cost in zip(words, costs):
            if cost < best.get(word, 1 << 60):
                best[word] = cost
        n = len(target)
        big = 1 << 62
        dp = [big] * (n + 1)
        dp[0] = 0
        items = list(best.items())
        for i in range(n):
            base = dp[i]
            if base == big:
                continue
            for word, cost in items:
                j = i + len(word)
                if j <= n and base + cost < dp[j] and target.startswith(word, i):
                    dp[j] = base + cost
        return -1 if dp[n] == big else dp[n]
