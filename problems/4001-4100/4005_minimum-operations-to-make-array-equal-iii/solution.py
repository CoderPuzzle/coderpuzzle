from math import gcd


class Solution:
    def minOperations(self, nums: list[int]) -> int:
        # Value -> multiplicity; already uniform (covers n = 1 and the
        # all-ones array) means nothing has to move.
        freq = {}
        for v in nums:
            freq[v] = freq.get(v, 0) + 1
        n = len(nums)
        if len(freq) == 1:
            return 0

        # Sieve once to sqrt(1e9); every value factors through these primes,
        # and a value whose surviving cofactor exceeds every tried prime's
        # square is itself prime.
        limit = 31623
        is_composite = bytearray(limit + 1)
        primes = []
        for i in range(2, limit + 1):
            if not is_composite[i]:
                primes.append(i)
                for j in range(i * i, limit + 1, i):
                    is_composite[j] = 1

        def factorize(v):
            fac = []
            for p in primes:
                if p * p > v:
                    break
                if v % p == 0:
                    e = 0
                    while v % p == 0:
                        v //= p
                        e += 1
                    fac.append((p, e))
            if v > 1:
                fac.append((v, 1))
            return fac

        def divisors(fac):
            ds = [1]
            for p, e in fac:
                pe = 1
                grown = []
                for _ in range(e):
                    pe *= p
                    grown.extend(d * pe for d in ds)
                ds.extend(grown)
            return ds

        facs = {v: factorize(v) for v in freq}

        # multipleCount[d] = number of elements divisible by d, folded by
        # frequency over every distinct value's divisor set.
        multiple_count = {}
        for v, f in freq.items():
            for d in divisors(facs[v]):
                multiple_count[d] = multiple_count.get(d, 0) + f

        # A target absent from nums costs at least one operation per element
        # (>= n total), while the lcm costs at most n (every element divides
        # it in one op), so the optimum sits at a present value > 1 or at the
        # lcm itself. Track the lcm only until it outgrows any element.
        lcm = 1
        capped = False
        for v in freq:
            g = gcd(lcm, v)
            lcm = lcm // g * v
            if lcm > 1000000000:
                capped = True
                break
        if capped or lcm not in freq:
            best = n
        else:
            best = n - freq[lcm]

        # For a target x > 1 an element equal to x pays 0, one dividing x or
        # divisible by x pays 1, anything else pays 2 (multiply by x, then
        # divide by v). Both comparable sets contain the equals, so folding
        # them in full gives cost = 2n - dd - dv with no double charge.
        for x, fx in freq.items():
            if x == 1:
                continue
            dd = 0
            for d in divisors(facs[x]):
                dd += freq.get(d, 0)
            cost = 2 * n - dd - multiple_count[x]
            if cost < best:
                best = cost
        return best
