class Solution:
    def countWinningSequences(self, s: str) -> int:
        # Rows are Bob's last move; columns are diff = Bob's points minus
        # Alice's, shifted by n + 1 so -n..n indexes 0..2n+2. Each round,
        # target row t is fed by the two other rows — both moved by the
        # same delta(t, alice) — so one elementwise add plus one
        # slice-shift advances every diff at once, keeping the bottom-up
        # pass at O(n^2) with no recursion.
        MOD = 10**9 + 7
        delta = [[0, -1, 1], [1, 0, -1], [-1, 1, 0]]  # target x alice
        moves = "FWE"

        def code(c: str) -> int:
            return 0 if c == "F" else 1 if c == "W" else 2

        n = len(s)
        offset = n + 1
        width = 2 * n + 3
        dp = {m: [0] * width for m in moves}
        for m in moves:
            dp[m][offset + delta[code(m)][code(s[0])]] = 1
        for alice in s[1:]:
            a = code(alice)
            ndp = {}
            for t, target in enumerate(moves):
                other1, other2 = (m for m in moves if m != target)
                src = [(x + y) % MOD for x, y in zip(dp[other1], dp[other2])]
                d = delta[t][a]
                if d == 1:
                    ndp[target] = [0] + src[:-1]
                elif d == -1:
                    ndp[target] = src[1:] + [0]
                else:
                    ndp[target] = src
            dp = ndp
        # Entries stay below MOD, so the triple-row total stays below
        # 6 * 10^3 * MOD and one final reduction finishes the job.
        return sum(sum(dp[m][offset + 1 :]) for m in moves) % MOD
