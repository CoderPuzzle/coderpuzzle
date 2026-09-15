class Solution:
    def checkIfCanBreak(self, s1: str, s2: str) -> bool:
        a = sorted(s1)
        b = sorted(s2)

        def dominates(x, y):
            return all(p >= q for p, q in zip(x, y))

        return dominates(a, b) or dominates(b, a)
