class Solution:
    def numberOfWays(self, n: int) -> int:
        # Count first with the unlimited coins {1, 2, 6}: once b six-coins
        # are set aside, the leftover r is filled freely by one- and
        # two-coins, which gives r // 2 + 1 arrangements per r. Adding up
        # that count over every number of sixes collapses the knapsack to
        # one arithmetic series. The value-4 coin exists exactly twice, so
        # its contribution is zero, one, or two indistinguishable copies,
        # each leaving a smaller target for the same series. Exact counts
        # reach into the low billions past the bounds, so keep the running
        # total wide and apply the modulus once at the end.
        modulo = 10**9 + 7
        total = 0
        for fours in (0, 4, 8):
            rest = n - fours
            while rest >= 0:
                total += rest // 2 + 1
                rest -= 6
        return total % modulo
