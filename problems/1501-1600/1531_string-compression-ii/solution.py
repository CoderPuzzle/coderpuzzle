class Solution:
    def getLengthOfOptimalCompression(self, s: str, k: int) -> int:
        n = len(s)

        def calc_len(count: int) -> int:
            if count == 0:
                return 0
            if count == 1:
                return 1
            if count < 10:
                return 2
            if count < 100:
                return 3
            return 4

        # dp(i, budget) is the shortest encoding of s[i:] using at most
        # `budget` more deletions. Memoized on (i, budget), both bounded
        # by n.
        memo = [[-1] * (k + 1) for _ in range(n + 1)]

        def dp(i: int, budget: int) -> int:
            if n - i <= budget:
                # Every remaining character can simply be deleted.
                return 0
            cached = memo[i][budget]
            if cached != -1:
                return cached
            # Delete s[i] outright and move on.
            best = dp(i + 1, budget - 1) if budget > 0 else float("inf")
            # Or keep a run of s[i]'s character: scan forward, paying one
            # deletion for every mismatched character folded into the run.
            same = diff = 0
            for j in range(i, n):
                if s[j] == s[i]:
                    same += 1
                else:
                    diff += 1
                    if diff > budget:
                        break
                best = min(best, calc_len(same) + dp(j + 1, budget - diff))
            memo[i][budget] = best
            return best

        return dp(0, k)
