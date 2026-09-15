class Solution {
  public:
    long long maxProduct(string s) {
        int n = (int)s.size();

        vector<long long> a(n);
        for (int i = 0; i < n; i++)
            a[i] = s[i] - 'a';
        const long long MOD1 = 1000000007LL;
        const long long MOD2 = 1000000009LL;
        const long long BASE = 26;

        // Precomputed base powers plus forward and reversed prefix hashes, so
        // any substring palindrome test costs O(1).
        vector<long long> pow1(n + 1, 1), pow2(n + 1, 1);
        vector<long long> pre1(n + 1, 0), pre2(n + 1, 0);
        vector<long long> rpre1(n + 1, 0), rpre2(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            pow1[i] = pow1[i - 1] * BASE % MOD1;
            pow2[i] = pow2[i - 1] * BASE % MOD2;
            pre1[i] = (pre1[i - 1] * BASE + a[i - 1]) % MOD1;
            pre2[i] = (pre2[i - 1] * BASE + a[i - 1]) % MOD2;
            rpre1[i] = (rpre1[i - 1] * BASE + a[n - i]) % MOD1;
            rpre2[i] = (rpre2[i - 1] * BASE + a[n - i]) % MOD2;
        }

        // s[l..r] is a palindrome iff its forward hash equals the forward hash
        // of the mirrored window in the reversed string; two independent
        // moduli make a false match vanishingly unlikely.
        auto isPal = [&](int l, int r) {
            int length = r - l + 1;
            long long f1 = ((pre1[r + 1] - pre1[l] * pow1[length]) % MOD1 + MOD1) % MOD1;
            long long g1 = ((rpre1[n - l] - rpre1[n - 1 - r] * pow1[length]) % MOD1 + MOD1) % MOD1;
            long long f2 = ((pre2[r + 1] - pre2[l] * pow2[length]) % MOD2 + MOD2) % MOD2;
            long long g2 = ((rpre2[n - l] - rpre2[n - 1 - r] * pow2[length]) % MOD2 + MOD2) % MOD2;
            return f1 == g1 && f2 == g2;
        };

        // A palindrome of radius k around c implies one at every smaller
        // radius, so the predicate is monotone: binary-search each center's
        // maximal reach.
        vector<int> d1(n, 0);
        for (int c = 0; c < n; c++) {
            int lo = 0, hi = min(c, n - 1 - c);
            while (lo < hi) {
                int mid = (lo + hi + 1) / 2;
                if (isPal(c - mid, c + mid))
                    lo = mid;
                else
                    hi = mid - 1;
            }
            d1[c] = lo + 1;
        }

        // Record, per center, the longest odd palindrome that ends exactly
        // at each index and the longest that starts exactly at each index.
        vector<int> bestEnd(n, 0), bestStart(n, 0);
        for (int c = 0; c < n; c++) {
            int length = 2 * d1[c] - 1;
            int end = c + d1[c] - 1;
            int start = c - d1[c] + 1;
            if (length > bestEnd[end])
                bestEnd[end] = length;
            if (length > bestStart[start])
                bestStart[start] = length;
        }

        // Shrink from the recorded maximum: a palindrome ending at i+1 of length L
        // implies one ending at i of length L-2 (drop one char from each side).
        for (int i = n - 2; i >= 0; i--) {
            int candEnd = bestEnd[i + 1] - 2;
            if (candEnd > bestEnd[i])
                bestEnd[i] = candEnd;
        }
        for (int i = 1; i < n; i++) {
            int candStart = bestStart[i - 1] - 2;
            if (candStart > bestStart[i])
                bestStart[i] = candStart;
        }

        // Prefix max of bestEnd / suffix max of bestStart = the longest
        // palindrome fully inside each prefix / suffix.
        vector<long long> pref(n), suff(n);
        pref[0] = bestEnd[0];
        for (int i = 1; i < n; i++)
            pref[i] = max(pref[i - 1], (long long)bestEnd[i]);

        suff[n - 1] = bestStart[n - 1];
        for (int i = n - 2; i >= 0; i--)
            suff[i] = max(suff[i + 1], (long long)bestStart[i]);

        // The two palindromes are disjoint, so some split separates them;
        // try every split. Single characters are length-1 palindromes, so
        // both sides always contribute at least 1.
        long long ans = 0;
        for (int i = 0; i < n - 1; i++) {
            long long candidate = pref[i] * suff[i + 1];
            if (candidate > ans)
                ans = candidate;
        }
        return ans;
    }
};
