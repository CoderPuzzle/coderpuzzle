class Solution:
    def minSteps(self, n: int) -> int:
        # Every strategy is a chain of segments: one Copy All plus p-1 Pastes
        # multiplies the screen by p at a cost of p operations, so a plan
        # reaching n corresponds to a factorization n = p1*...*pk with cost
        # p1+...+pk. Splitting a composite factor a*b into a and b never
        # costs more (a+b <= a*b when a,b >= 2), so the cheapest plan is the
        # fully split one: the answer is the sum of n's prime factors with
        # multiplicity. Strip each smallest prime factor p while p*p <= n;
        # whatever exceeds 1 afterwards is itself prime and is added once.
        # n = 1 skips both loops: the screen already shows one 'A', cost 0.
        ans = 0
        p = 2
        while p * p <= n:
            while n % p == 0:
                ans += p
                n //= p
            p += 1
        if n > 1:
            ans += n
        return ans
