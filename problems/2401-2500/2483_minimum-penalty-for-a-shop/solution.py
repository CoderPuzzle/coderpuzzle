from typing import List, Optional


class Solution:
    def bestClosingTime(self, customers: str) -> int:
        # penalty at closing hour j = (#'N' in customers[:j]) + (#'Y' in customers[j:])
        prefix_n = 0
        suffix_y = sum(1 for c in customers if c == "Y")
        best_j = 0
        best_penalty = prefix_n + suffix_y
        for j in range(1, len(customers) + 1):
            if customers[j - 1] == "N":
                prefix_n += 1
            else:
                suffix_y -= 1
            penalty = prefix_n + suffix_y
            if penalty < best_penalty:
                best_penalty = penalty
                best_j = j
        return best_j
