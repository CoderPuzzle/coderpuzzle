from bisect import bisect_right


class Solution:
    def countFancy(self, l: int, r: int) -> int:
        # Strictly increasing numbers draw digits from 1..9; strictly
        # decreasing ones from 0..9 with no leading zero. Enumerate every
        # nonempty digit subset once per direction and deduplicate.
        good_set = set()
        for mask in range(1, 1 << 9):
            num = 0
            for d in range(1, 10):
                if mask & (1 << (d - 1)):
                    num = num * 10 + d
            good_set.add(num)
        for mask in range(1, 1 << 10):
            num = 0
            for d in range(9, -1, -1):
                if mask & (1 << d):
                    num = num * 10 + d
            if num > 0:
                good_set.add(num)
        goods = sorted(good_set)

        # good[s] == 1 when the integer s itself is a strictly monotone
        # number; those are exactly the good digit sums (s in [1, 144]).
        good = [0] * 145
        for s in range(1, 145):
            if s in good_set:
                good[s] = 1

        def digit_sum(x: int) -> int:
            total = 0
            while x > 0:
                total += x % 10
                x //= 10
            return total

        # overlap[i]: among goods[:i], how many also have a good digit sum
        overlap = [0] * (len(goods) + 1)
        for i, g in enumerate(goods):
            overlap[i + 1] = overlap[i] + good[digit_sum(g)]

        def count_sum_good(x: int) -> int:
            # Numbers in [1, x] whose digit sum is a good sum.
            if x <= 0:
                return 0
            s = str(x)
            n = len(s)
            # ways[k][t]: k free digits (0-9, leading zeros allowed) summing
            # to exactly t. Counts reach ~10^15, so Python ints carry them.
            ways = [[0] * 145 for _ in range(n + 1)]
            ways[0][0] = 1
            for k in range(1, n + 1):
                prev = ways[k - 1]
                row = ways[k]
                for t in range(145):
                    total = 0
                    for d in range(10):
                        if t >= d:
                            total += prev[t - d]
                    row[t] = total

            def count_free(k: int, base: int) -> int:
                # The remaining k digits add s_, making the digit sum
                # base + s_; it must land on a good sum.
                result = 0
                for s_ in range(min(9 * k, 144 - base) + 1):
                    if good[base + s_]:
                        result += ways[k][s_]
                return result

            result = 0
            running = 0
            for i, ch in enumerate(s):
                v = int(ch)
                k = n - i - 1
                # A smaller digit here fixes the prefix; the tail is free.
                for d in range(v):
                    result += count_free(k, running + d)
                running += v
            if good[running]:
                result += 1
            return result

        def count_good(x: int) -> int:
            return bisect_right(goods, x)

        def count_overlap(x: int) -> int:
            return overlap[bisect_right(goods, x)]

        def count_fancy(x: int) -> int:
            # Fancy = good digits OR good digit sum; subtract the goods
            # whose digit sum is also good (counted by both terms).
            return count_sum_good(x) + count_good(x) - count_overlap(x)

        return count_fancy(r) - count_fancy(l - 1)
