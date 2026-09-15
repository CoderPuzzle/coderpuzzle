from typing import List


class Solution:
    def judgePoint24(self, cards: List[int]) -> bool:
        # Backtracking over the multiset of remaining values. Any
        # expression tree evaluates bottom-up by combining two siblings
        # at a time, so taking each unordered pair, applying every
        # operator (both orders for '-' and '/'), and recursing on the
        # shorter list explores every expression exactly. Real division
        # makes exact equality untestable in floating point, so a lone
        # remaining value wins when it sits within EPS of 24.
        def solve(values: List[float]) -> bool:
            if len(values) == 1:
                return abs(values[0] - 24.0) < 1e-6
            n = len(values)
            for i in range(n):
                for j in range(i + 1, n):
                    a, b = values[i], values[j]
                    rest = [values[k] for k in range(n) if k != i and k != j]
                    results = [a + b, a - b, b - a, a * b]
                    if b != 0.0:
                        results.append(a / b)
                    if a != 0.0:
                        results.append(b / a)
                    for result in results:
                        if solve(rest + [result]):
                            return True
            return False

        return solve([float(card) for card in cards])
