class Solution:
    def bestTeamScore(self, scores: list[int], ages: list[int]) -> int:
        n = len(scores)
        # Sort player indices by age, breaking ties by score, so any
        # conflict-free team becomes a non-decreasing run of scores.
        order = sorted(range(n), key=lambda i: (ages[i], scores[i]))
        sorted_scores = [scores[i] for i in order]

        # dp[i] = best total for a team ending at player i (in sorted order).
        dp = [0] * n
        best = 0
        for i in range(n):
            dp[i] = sorted_scores[i]
            for j in range(i):
                if sorted_scores[j] <= sorted_scores[i]:
                    dp[i] = max(dp[i], dp[j] + sorted_scores[i])
            best = max(best, dp[i])
        return best
