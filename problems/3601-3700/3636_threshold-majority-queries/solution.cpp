#include <algorithm>
#include <cmath>
#include <vector>

using namespace std;

class Solution {
  public:
    int isqrt(int q) {
        int s = (int)sqrt((double)q);
        while ((long long)(s + 1) * (s + 1) <= q) {
            s++;
        }
        while ((long long)s * s > q) {
            s--;
        }
        return s;
    }

    vector<int> subarrayMajority(vector<int> &nums, vector<vector<int>> &queries) {
        int n = nums.size();
        // Rank-compress: "smallest value" becomes "smallest rank".
        vector<int> values(nums);
        sort(values.begin(), values.end());
        values.erase(unique(values.begin(), values.end()), values.end());
        int m = values.size();
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            a[i] = lower_bound(values.begin(), values.end(), nums[i]) - values.begin();
        }
        // occ[r] lists the sorted positions of rank r, so any range frequency
        // is two binary searches.
        vector<vector<int>> occ(m);
        for (int pos = 0; pos < n; pos++) {
            occ[a[pos]].push_back(pos);
        }

        // Block size balancing the block-pair sweep against query fringes.
        int b = max(1, n / isqrt((int)queries.size()));
        int k = (n + b - 1) / b;
        // top_f[i*k+j] / top_v[i*k+j]: highest frequency inside blocks i..j
        // and the smallest rank attaining it. One sweep per left block grows
        // the window additions-only, so counts never decrease and the mode
        // pair stays O(1) per element.
        vector<int> top_f(k * k, 0), top_v(k * k, 0), cnt(m, 0);
        for (int i = 0; i < k; i++) {
            fill(cnt.begin(), cnt.end(), 0);
            int mf = 0, mv = 0, pos = i * b;
            for (int j = i; j < k; j++) {
                int end = min((j + 1) * b, n);
                for (; pos < end; pos++) {
                    int x = a[pos];
                    int c = ++cnt[x];
                    if (c > mf) {
                        mf = c;
                        mv = x;
                    } else if (c == mf && x < mv) {
                        mv = x;
                    }
                }
                top_f[i * k + j] = mf;
                top_v[i * k + j] = mv;
            }
        }

        // The overall top element clears any threshold exactly when something
        // does, so every answer is that element's pair checked once.
        vector<int> stamp(m, 0), freq(m, 0), seen;
        seen.reserve(2 * b);
        vector<int> out;
        out.reserve(queries.size());
        int token = 0;
        for (const auto &query : queries) {
            int l = query[0], r = query[1], t = query[2];
            int bl = l / b, br = r / b;
            token++;
            int bf, bv;
            if (br - bl <= 1) {
                // Range spans at most two blocks: count it directly.
                bf = 0;
                bv = 0;
                for (int pos = l; pos <= r; pos++) {
                    int x = a[pos];
                    if (stamp[x] != token) {
                        stamp[x] = token;
                        freq[x] = 1;
                    } else {
                        freq[x]++;
                    }
                    int c = freq[x];
                    if (c > bf) {
                        bf = c;
                        bv = x;
                    } else if (c == bf && x < bv) {
                        bv = x;
                    }
                }
            } else {
                // Whole blocks give the base candidate; every distinct fringe
                // rank gets its exact range frequency from two binary searches
                // (its total count also spans the middle blocks, so fringe
                // counts alone can never prune it).
                int idx = (bl + 1) * k + br - 1;
                bf = top_f[idx];
                bv = top_v[idx];
                seen.clear();
                for (int pos = l; pos < (bl + 1) * b; pos++) {
                    int x = a[pos];
                    if (stamp[x] != token) {
                        stamp[x] = token;
                        seen.push_back(x);
                    }
                }
                for (int pos = br * b; pos <= r; pos++) {
                    int x = a[pos];
                    if (stamp[x] != token) {
                        stamp[x] = token;
                        seen.push_back(x);
                    }
                }
                for (int x : seen) {
                    const vector<int> &list = occ[x];
                    int f = upper_bound(list.begin(), list.end(), r) - lower_bound(list.begin(), list.end(), l);
                    if (f > bf || (f == bf && x < bv)) {
                        bf = f;
                        bv = x;
                    }
                }
            }
            out.push_back(bf >= t ? values[bv] : -1);
        }
        return out;
    }
};
