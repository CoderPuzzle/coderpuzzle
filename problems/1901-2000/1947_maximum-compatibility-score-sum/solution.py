from typing import List, Optional


class Solution:
    def maxCompatibilitySum(self, students: List[List[int]], mentors: List[List[int]]) -> int:
        m = len(students)
        # Precompute the m x m agreement counts so the DP touches only ints.
        score = [[sum(a == b for a, b in zip(students[i], mentors[j])) for j in range(m)] for i in range(m)]
        full = 1 << m
        # dp[mask] = best total score matching the first popcount(mask)
        # students to exactly the mentors in mask; dp[0] = 0. The used-mentor
        # count alone pins down which student is placed next.
        dp = [0] * full
        # Increasing numeric order works because every submask is numerically
        # smaller, so dependencies are already final when reached.
        for mask in range(1, full):
            i = bin(mask).count("1") - 1
            best = 0
            for j in range(m):
                # Mentor j was this student's match: extend the assignment
                # without j by their pairwise score.
                if mask >> j & 1:
                    best = max(best, dp[mask ^ (1 << j)] + score[i][j])
            dp[mask] = best
        return dp[full - 1]
