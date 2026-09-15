from typing import List


class Solution:
    def totalBeauty(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        maxa = max(nums)
        # Smallest-prime-factor sieve: factorizes every distinct value once
        # so its divisors can be expanded cheaply, and each element's index
        # lands in one bucket per divisor. Bucket g then holds, in original
        # order, every position whose value is divisible by g.
        spf = list(range(maxa + 1))
        for i in range(2, int(maxa**0.5) + 1):
            if spf[i] == i:
                for j in range(i * i, maxa + 1, i):
                    if spf[j] == j:
                        spf[j] = i
        buckets = [[] for _ in range(maxa + 1)]
        divisor_cache = {}
        for index, value in enumerate(nums):
            divisors = divisor_cache.get(value)
            if divisors is None:
                divisors = [1]
                rest = value
                while rest > 1:
                    prime = spf[rest]
                    times = 0
                    while rest % prime == 0:
                        rest //= prime
                        times += 1
                    seed = len(divisors)
                    power = prime
                    for _ in range(times):
                        for k in range(seed):
                            divisors.append(divisors[k] * power)
                        power *= prime
                divisor_cache[value] = divisors
            for d in divisors:
                buckets[d].append(index)
        # cnt[g] counts strictly increasing subsequences whose elements are
        # all divisible by g — exactly those whose GCD is a multiple of g.
        # Walking bucket g in index order, an element contributes one plus
        # the weight already accumulated at strictly smaller scaled values,
        # which is the prefix sum a Fenwick tree keeps over value ranks.
        cnt = [0] * (maxa + 1)
        for g in range(1, maxa + 1):
            positions = buckets[g]
            if not positions:
                continue
            size = maxa // g
            fen = [0] * (size + 1)
            total = 0
            for i in positions:
                w = nums[i] // g
                acc = 0
                j = w - 1
                while j > 0:
                    acc += fen[j]
                    j &= j - 1
                ways = (acc + 1) % MOD
                j = w
                while j <= size:
                    fen[j] = (fen[j] + ways) % MOD
                    j += j & -j
                total += ways
            cnt[g] = total % MOD
        # Descending sweep converts divisible-by counts into exactly-g
        # counts: by the time g is reached, every proper multiple has been
        # finalized and can be subtracted out. Each surviving g*F[g] joins
        # the answer; F[g] = 0 buckets contribute nothing.
        answer = 0
        exact = [0] * (maxa + 1)
        for g in range(maxa, 0, -1):
            f = cnt[g]
            k = 2 * g
            while k <= maxa:
                f -= exact[k]
                k += g
            f %= MOD
            if f:
                answer = (answer + g * f) % MOD
            exact[g] = f
        return answer
