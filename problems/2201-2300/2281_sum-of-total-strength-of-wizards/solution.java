class Solution {

    private static final long MOD = 1_000_000_007L;

    public int totalStrength(int[] strength) {
        int n = strength.length;

        // prev[i]: index of nearest strictly-smaller element to the left, else -1.
        int[] prev = new int[n];
        int[] stack = new int[n];
        int top = -1;
        for (int i = 0; i < n; i++) {
            while (top >= 0 && strength[stack[top]] >= strength[i]) {
                top--;
            }
            prev[i] = top >= 0 ? stack[top] : -1;
            stack[++top] = i;
        }

        // nxt[i]: index of nearest element <= strength[i] to the right, else n.
        int[] nxt = new int[n];
        top = -1;
        for (int i = n - 1; i >= 0; i--) {
            while (top >= 0 && strength[stack[top]] > strength[i]) {
                top--;
            }
            nxt[i] = top >= 0 ? stack[top] : n;
            stack[++top] = i;
        }

        // All prefix sums are kept reduced mod MOD; only residues are needed below.
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = (prefix[i] + strength[i]) % MOD;
        }

        // pre_prefix[k] = sum of prefix[0..k-1]
        long[] prePrefix = new long[n + 2];
        for (int i = 0; i <= n; i++) {
            prePrefix[i + 1] = (prePrefix[i] + prefix[i]) % MOD;
        }

        long answer = 0;
        for (int i = 0; i < n; i++) {
            long left = i - prev[i];
            long right = nxt[i] - i;
            long sumLeft = (prePrefix[i + 1] - prePrefix[prev[i] + 1] + MOD) % MOD;
            long sumRight = (prePrefix[nxt[i] + 1] - prePrefix[i + 1] + MOD) % MOD;
            // Python's % is always non-negative; normalize explicitly.
            long term = (((left * sumRight - right * sumLeft) % MOD) + MOD) % MOD;
            long contribution = ((strength[i] % MOD) * term) % MOD;
            answer = (answer + contribution) % MOD;
        }
        return (int) answer;
    }
}
