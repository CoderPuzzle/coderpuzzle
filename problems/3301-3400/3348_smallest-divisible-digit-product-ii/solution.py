class Solution:
    def smallestNumber(self, num: str, t: int) -> str:
        # A product of nonzero digits only ever carries the primes 2, 3, 5
        # and 7, so any other prime factor in t makes the request impossible.
        need = [0, 0, 0, 0]
        for idx, prime in enumerate((2, 3, 5, 7)):
            while t % prime == 0:
                t //= prime
                need[idx] += 1
        if t != 1:
            return "-1"
        # Per-digit exponent vectors over the primes (2, 3, 5, 7).
        vec = [[0, 0, 0, 0] for _ in range(10)]
        for d in range(2, 10):
            for idx, prime in enumerate((2, 3, 5, 7)):
                rest = d
                while rest % prime == 0:
                    rest //= prime
                    vec[d][idx] += 1

        def min_digits(r):
            # Fewest digits whose product covers r: a 5 or a 7 in r always
            # burns a dedicated digit; among twos and threes, eights carry
            # three twos, nines two threes, and a six trades one of each,
            # and that trade only pays for the first couple of leftovers,
            # so a short scan over the six count finds the minimum.
            best = r[2] + r[3] + (r[0] + 2) // 3 + (r[1] + 1) // 2
            for z in range(1, min(r[0], r[1], 5) + 1):
                best = min(best, r[2] + r[3] + z + (r[0] - z + 2) // 3 + (r[1] - z + 1) // 2)
            return best

        def build(length, r):
            # Lexicographically smallest zero-free string of exactly this
            # length covering r: place the smallest digit that leaves a
            # remainder the positions still open can cover.
            out = []
            for pos in range(length):
                for d in range(1, 10):
                    nxt = [max(0, r[k] - vec[d][k]) for k in range(4)]
                    if min_digits(nxt) <= length - pos - 1:
                        out.append(str(d))
                        r = nxt
                        break
            return "".join(out)

        n = len(num)
        # A kept 0 would poison the product, so nothing at or past the first
        # zero can be retained; the prefix sums cover the zero-free head.
        first_zero = next((i for i, ch in enumerate(num) if ch == "0"), n)
        prefix = [[0, 0, 0, 0]]
        for ch in num[:first_zero]:
            last = prefix[-1]
            add = vec[ord(ch) - 48]
            prefix.append([last[k] + add[k] for k in range(4)])
        if first_zero == n and all(prefix[n][k] >= need[k] for k in range(4)):
            return num
        # Keep the longest possible prefix and raise exactly one digit: a
        # longer kept prefix always wins, then a smaller raised digit, then
        # a minimal suffix. The shortfall shrinks as the split moves left
        # while the free suffix grows, so the first workable split is the
        # answer, and only a handful of splits near the end can fail.
        for i in range(min(n - 1, first_zero), -1, -1):
            free = n - 1 - i
            for d in range(ord(num[i]) - 47, 10):
                r = [max(0, need[k] - prefix[i][k] - vec[d][k]) for k in range(4)]
                if min_digits(r) <= free:
                    return num[:i] + chr(48 + d) + build(free, r)
        # No same-length number works: the smallest longer zero-free number
        # is leading 1s with just enough covering digits at the very end.
        return build(max(n + 1, min_digits(need)), need)
