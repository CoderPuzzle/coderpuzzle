class Solution:
    def divisorGame(self, n: int) -> bool:
        # win[i] is true if the player about to move at value i can force
        # a win. Every position only depends on smaller positions already
        # computed earlier in this same forward sweep.
        win = [False] * (n + 1)
        for i in range(1, n + 1):
            for x in range(1, i):
                if i % x == 0 and not win[i - x]:
                    win[i] = True
                    break
        return win[n]
