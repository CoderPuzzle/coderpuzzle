#include <algorithm>
#include <string>
#include <vector>

using namespace std;

class Solution {
  public:
    long long countFancy(long long l, long long r) {
        // Strictly increasing numbers draw digits from 1..9; strictly
        // decreasing ones from 0..9 with no leading zero. Enumerate every
        // nonempty digit subset once per direction and deduplicate.
        vector<long long> goods;
        for (int mask = 1; mask < (1 << 9); mask++) {
            long long num = 0;
            for (int d = 1; d <= 9; d++) {
                if (mask & (1 << (d - 1)))
                    num = num * 10 + d;
            }
            goods.push_back(num);
        }
        for (int mask = 1; mask < (1 << 10); mask++) {
            long long num = 0;
            for (int d = 9; d >= 0; d--) {
                if (mask & (1 << d))
                    num = num * 10 + d;
            }
            if (num > 0)
                goods.push_back(num);
        }
        sort(goods.begin(), goods.end());
        goods.erase(unique(goods.begin(), goods.end()), goods.end());

        // good[s] == 1 when the integer s is itself strictly monotone;
        // those are exactly the good digit sums (s in [1, 144]).
        vector<int> good(145, 0);
        for (long long g : goods) {
            if (g <= 144)
                good[(int)g] = 1;
        }

        // overlap[i]: among goods[0..i), how many also have a good digit sum
        vector<long long> overlap(goods.size() + 1, 0);
        for (size_t i = 0; i < goods.size(); i++) {
            overlap[i + 1] = overlap[i] + good[digitSum(goods[i])];
        }

        return countUpTo(r, goods, good, overlap) - countUpTo(l - 1, goods, good, overlap);
    }

  private:
    int digitSum(long long n) {
        int s = 0;
        while (n > 0) {
            s += n % 10;
            n /= 10;
        }
        return s;
    }

    long long countUpTo(long long x, const vector<long long> &goods, const vector<int> &good,
                        const vector<long long> &overlap) {
        // Fancy = good digits OR good digit sum; subtract the goods whose
        // digit sum is also good (counted by both terms).
        return countSumGood(x, good) + countGood(x, goods) - countOverlap(x, goods, overlap);
    }

    long long countGood(long long x, const vector<long long> &goods) {
        return upper_bound(goods.begin(), goods.end(), x) - goods.begin();
    }

    long long countOverlap(long long x, const vector<long long> &goods, const vector<long long> &overlap) {
        return overlap[countGood(x, goods)];
    }

    long long countSumGood(long long x, const vector<int> &good) {
        // Numbers in [1, x] whose digit sum is a good sum.
        if (x <= 0)
            return 0;
        string s = to_string(x);
        int n = s.size();
        // ways[k][t]: k free digits (0-9, leading zeros allowed) summing to
        // exactly t. Counts reach ~10^15, past 32 bits, so the table is
        // long long.
        vector<vector<long long>> ways(n + 1, vector<long long>(145, 0));
        ways[0][0] = 1;
        for (int k = 1; k <= n; k++) {
            for (int t = 0; t <= 144; t++) {
                long long total = 0;
                for (int d = 0; d <= 9; d++) {
                    if (t >= d)
                        total += ways[k - 1][t - d];
                }
                ways[k][t] = total;
            }
        }
        long long result = 0;
        int running = 0;
        for (int i = 0; i < n; i++) {
            int v = s[i] - '0';
            int k = n - i - 1;
            // A smaller digit here fixes the prefix; the tail is free.
            for (int d = 0; d < v; d++) {
                int base = running + d;
                int limit = min(9 * k, 144 - base);
                for (int rem = 0; rem <= limit; rem++) {
                    if (good[base + rem])
                        result += ways[k][rem];
                }
            }
            running += v;
        }
        if (good[running])
            result += 1;
        return result;
    }
};
