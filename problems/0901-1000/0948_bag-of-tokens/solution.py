from typing import List


class Solution:
    def bagOfTokensScore(self, tokens: List[int], power: int) -> int:
        # An optimal plan buys points with the cheapest tokens and sells the
        # dearest ones for power, so sort and walk two pointers inward.
        tokens.sort()
        left, right = 0, len(tokens) - 1
        score = best = 0
        while left <= right:
            if power >= tokens[left]:
                # Affordable: buy a point with the cheapest remaining token.
                power -= tokens[left]
                score += 1
                left += 1
                best = max(best, score)
            elif score >= 1 and left < right:
                # Broke: sell a point for the power of the dearest token,
                # keeping one token in play to spend it on.
                power += tokens[right]
                score -= 1
                right -= 1
            else:
                break
        return best
