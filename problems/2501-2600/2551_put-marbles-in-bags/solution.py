from typing import List, Optional


class Solution:
    def putMarbles(self, weights: List[int], k: int) -> int:
        # One bag means no cuts — a correctness guard, not an optimization:
        # the general formula's slicing does not describe the k = 1 case.
        if k == 1:
            return 0
        # Each bag costs the sum of its endpoints, and weights[0] +
        # weights[n-1] appear in every distribution's score, so they cancel in
        # the max-minus-min difference. Only the k-1 internal cuts matter:
        # cutting between i and i+1 adds weights[i] + weights[i+1].
        adj = sorted(weights[i] + weights[i + 1] for i in range(len(weights) - 1))
        m = k - 1
        # Max score takes the m largest cut sums, min the m smallest; their
        # difference is the answer.
        return sum(adj[-m:]) - sum(adj[:m])
