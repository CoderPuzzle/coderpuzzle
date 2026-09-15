class Solution:
    def waysToReachStair(self, k: int) -> int:
        # With x up-ops the top height is 2^x, so ending on stair k takes
        # y = 2^x - k down-ops; they must sit in distinct gaps among the
        # x + 1 slots around the ups, giving C(x + 1, y) orderings. Every
        # ordering stays legal: the position before any down is 2^t - s
        # with s <= t, hence >= 1, so stair 0 never triggers its rule.
        total = 0
        ups = 0
        while True:
            downs = (1 << ups) - k
            if downs > ups + 1:
                break
            if downs >= 0:
                ways = 1
                for i in range(downs):
                    ways = ways * (ups + 1 - i) // (i + 1)
                total += ways
            ups += 1
        return total
