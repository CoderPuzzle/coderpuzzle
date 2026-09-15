class Solution {
  public:
    vector<int> maximumCount(vector<int> &nums, vector<vector<int>> &queries) {
        // A prime counts on both sides of a split at k exactly when k lies
        // in [first + 1, last] of its occurrence indices, so every query
        // answer is (distinct primes present) + (deepest interval overlap).
        // Each prime value keeps a sorted list of its occurrence indices,
        // and an interval entering or leaving is two point updates in a
        // max-prefix segment tree over the split positions (+1 at first+1,
        // -1 at last+1): the root stores the largest prefix sum of the
        // event array, i.e. the best overlap, and the update work per query
        // is a constant number of interval insertions and removals.
        const int LIMIT = 100001;
        vector<bool> isPrime(LIMIT, true);
        isPrime[0] = isPrime[1] = false;
        for (int i = 2; i * i < LIMIT; ++i) {
            if (isPrime[i]) {
                for (int j = i * i; j < LIMIT; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        int n = nums.size();
        int size = 1;
        while (size < n) {
            size <<= 1;
        }
        vector<int> segSum(2 * size, 0), segBest(2 * size, 0);
        auto addEvent = [&](int pos, int delta) {
            int u = size + pos - 1;
            segSum[u] += delta;
            segBest[u] = segSum[u] > 0 ? segSum[u] : 0;
            for (u >>= 1; u; u >>= 1) {
                int left = u + u;
                segSum[u] = segSum[left] + segSum[left + 1];
                int cross = segSum[left] + segBest[left + 1];
                segBest[u] = cross > segBest[left] ? cross : segBest[left];
            }
        };
        auto events = [&](vector<int> &idxs, int sign) {
            addEvent(idxs.front() + 1, sign);
            addEvent(idxs.back() + 1, -sign);
        };
        vector<int> cur = nums;
        unordered_map<int, vector<int>> occ;
        int distinct = 0;
        for (int i = 0; i < n; ++i) {
            int v = cur[i];
            if (isPrime[v]) {
                if (!occ.count(v)) {
                    occ[v] = {};
                    ++distinct;
                }
                occ[v].push_back(i);
            }
        }
        for (auto &entry : occ) {
            if (entry.second.size() >= 2) {
                events(entry.second, 1);
            }
        }
        vector<int> answers;
        answers.reserve(queries.size());
        for (auto &q : queries) {
            int idx = q[0], val = q[1];
            int old = cur[idx];
            if (old != val) {
                if (isPrime[old]) {
                    if (occ[old].size() >= 2) {
                        events(occ[old], -1);
                    }
                    occ[old].erase(lower_bound(occ[old].begin(), occ[old].end(), idx));
                    if (occ[old].empty()) {
                        occ.erase(old);
                        --distinct;
                    } else if (occ[old].size() >= 2) {
                        events(occ[old], 1);
                    }
                }
                if (isPrime[val]) {
                    if (occ.count(val) && occ[val].size() >= 2) {
                        events(occ[val], -1);
                    }
                    vector<int> &lst = occ[val];
                    lst.insert(lower_bound(lst.begin(), lst.end(), idx), idx);
                    if (lst.size() >= 2) {
                        events(lst, 1);
                    } else {
                        ++distinct;
                    }
                }
                cur[idx] = val;
            }
            answers.push_back(distinct + segBest[1]);
        }
        return answers;
    }
};
