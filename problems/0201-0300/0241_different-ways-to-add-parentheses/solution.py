from typing import List


class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        def values(lo: int, hi: int) -> List[int]:
            results: List[int] = []
            split = False
            for i in range(lo, hi):
                op = expression[i]
                if op not in "+-*":
                    continue
                split = True
                # Every operator takes its turn as the root of the expression
                # tree, so each split contributes the cross product of the
                # values its two sides can produce.
                for left in values(lo, i):
                    for right in values(i + 1, hi):
                        if op == "+":
                            results.append(left + right)
                        elif op == "-":
                            results.append(left - right)
                        else:
                            results.append(left * right)
            if not split:
                # A range without an operator is a single operand: its only
                # grouping is the number itself.
                results.append(int(expression[lo:hi]))
            return results

        # The recursion emits each root operator's cross products in string
        # order; one ascending sort turns that into the pinned order, and
        # nothing dedupes, so equal values from different groupings survive.
        return sorted(values(0, len(expression)))
