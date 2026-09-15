class Solution {
  public:
    long long countGoodIntegers(int n, int k) {
        int half = (n + 1) / 2;
        vector<long long> fact(n + 1);
        fact[0] = 1;
        for (int i = 1; i <= n; i++)
            fact[i] = fact[i - 1] * i;
        set<array<int, 10>> seen;
        int limit = 1;
        for (int i = 0; i < half; i++)
            limit *= 10;
        vector<int> prefix(half), seq(n);
        // A good integer is a rearrangement of a k-palindrome, and a
        // palindrome is fixed by its first half (for odd n the middle digit
        // is shared) — so only 10^half halves need enumerating.
        for (int first = 0; first < limit; first++) {
            int v = first;
            for (int i = 0; i < half; i++) {
                prefix[i] = v % 10;
                v /= 10;
            }
            // prefix is little-endian: a zero leading digit would make the
            // palindrome not n-digit, so skip it.
            if (prefix[half - 1] == 0)
                continue;
            // Mirror the half into the full palindrome; for odd n the middle
            // digit is shared, so the tail repeats only half-1 digits.
            int len = 0;
            for (int i = half - 1; i >= 0; i--)
                seq[len++] = prefix[i];
            if (n % 2 == 0) {
                for (int i = 0; i < half; i++)
                    seq[len++] = prefix[i];
            } else {
                for (int i = 1; i < half; i++)
                    seq[len++] = prefix[i];
            }
            // value accumulates the palindrome mod k while digits are counted;
            // survivors are keyed by digit counts so identical multisets are
            // counted once.
            array<int, 10> counts{};
            long long value = 0;
            for (int i = 0; i < len; i++) {
                int d = seq[i];
                counts[d]++;
                value = (value * 10 + d) % k;
            }
            if (value == 0)
                seen.insert(counts);
        }
        long long answer = 0;
        for (const auto &counts : seen) {
            // Distinct n-digit integers with exactly these digits: the
            // multinomial n! / prod(c_d!).
            long long total = fact[n];
            for (int c : counts)
                total /= fact[c];
            // Arrangements starting with 0 are not n-digit numbers: fix a
            // zero in front and permute the rest, then subtract.
            if (counts[0] > 0) {
                long long lead = fact[n - 1];
                lead /= fact[counts[0] - 1];
                for (int d = 1; d < 10; d++)
                    lead /= fact[counts[d]];
                total -= lead;
            }
            answer += total;
        }
        return answer;
    }
};
