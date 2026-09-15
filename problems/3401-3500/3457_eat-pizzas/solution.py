class Solution:
    def maxWeight(self, pizzas: List[int]) -> int:
        # Odd days bank their maximum, so the ceil(d/2) odd days claim the
        # top weights first; each even day then banks the second pizza of a
        # consecutive top pair. The total reaches 5e9, past 32-bit range.
        pizzas.sort()
        n = len(pizzas)
        odd_days = (n // 4 + 1) // 2
        total = 0
        top = n - 1
        for _ in range(odd_days):
            total += pizzas[top]
            top -= 1
        for _ in range(n // 4 - odd_days):
            top -= 1
            total += pizzas[top]
            top -= 1
        return total
