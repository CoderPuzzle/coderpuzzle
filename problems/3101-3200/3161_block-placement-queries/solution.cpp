class Solution {
  public:
    vector<bool> getResults(vector<vector<int>> &queries) {
        // d[i] is the free run at start i: the distance from i to the first
        // obstacle strictly after it. A block of size sz can be laid down at
        // start i exactly when d[i] >= sz -- an obstacle may be touched at
        // either end, so only one strictly inside the block forbids it.
        // Placing an obstacle at t rewrites that affine run across the gap it
        // splits, which this lazy assignment segment tree tracks; each type-2
        // query then asks whether the best run among starts [0, x - sz]
        // reaches sz.
        int span = 1;
        set<int> candSet;
        int typeTwo = 0;
        for (const vector<int> &q : queries) {
            if (q[0] == 2) {
                span = max(span, q[1]);
                typeTwo++;
            } else {
                candSet.insert(q[1]);
            }
        }
        vector<int> cands(candSet.begin(), candSet.end());
        int k = (int)cands.size();
        vector<bool> result(typeTwo, false);
        vector<int> fen(k + 1, 0);
        auto fenAdd = [&](int i) {
            for (; i <= k; i += i & -i) {
                fen[i]++;
            }
        };
        auto fenSum = [&](int i) {
            int total = 0;
            for (; i > 0; i -= i & -i) {
                total += fen[i];
            }
            return total;
        };

        // Segment tree over starts 0..span-1; tag 0 means untagged because
        // every real obstacle distance is >= 1.
        int n2 = 4 * span;
        vector<int> mx(n2, 0), tag(n2, 0);
        function<void(int, int, int)> build = [&](int node, int lo, int hi) {
            if (lo == hi) {
                // No obstacle yet: read the run as reaching past span,
                // which stays above any achievable sz without inventing
                // blockage.
                mx[node] = span - lo;
                return;
            }
            int mid = (lo + hi) / 2;
            build(node * 2, lo, mid);
            build(node * 2 + 1, mid + 1, hi);
            mx[node] = max(mx[node * 2], mx[node * 2 + 1]);
        };
        // The run t - i shrinks as i grows, so the gap's best sits left.
        auto applyTo = [&](int node, int lo, int t) {
            tag[node] = t;
            mx[node] = t - lo;
        };
        function<void(int, int, int)> pushDown = [&](int node, int lo, int mid) {
            if (tag[node] != 0) {
                applyTo(node * 2, lo, tag[node]);
                applyTo(node * 2 + 1, mid + 1, tag[node]);
                tag[node] = 0;
            }
        };
        function<void(int, int, int, int, int, int)> update = [&](int node, int lo, int hi, int ql, int qr, int t) {
            if (qr < lo || hi < ql) {
                return;
            }
            if (ql <= lo && hi <= qr) {
                applyTo(node, lo, t);
                return;
            }
            int mid = (lo + hi) / 2;
            pushDown(node, lo, mid);
            update(node * 2, lo, mid, ql, qr, t);
            update(node * 2 + 1, mid + 1, hi, ql, qr, t);
            mx[node] = max(mx[node * 2], mx[node * 2 + 1]);
        };
        function<int(int, int, int, int, int)> query = [&](int node, int lo, int hi, int ql, int qr) -> int {
            if (qr < lo || hi < ql) {
                return 0;
            }
            if (ql <= lo && hi <= qr) {
                return mx[node];
            }
            int mid = (lo + hi) / 2;
            pushDown(node, lo, mid);
            return max(query(node * 2, lo, mid, ql, qr), query(node * 2 + 1, mid + 1, hi, ql, qr));
        };

        build(1, 0, span - 1);
        int seen = 0;
        for (const vector<int> &q : queries) {
            if (q[0] == 1) {
                int t = q[1];
                int rank = (int)(lower_bound(cands.begin(), cands.end(), t) - cands.begin()) + 1;
                int below = fenSum(rank - 1);
                // Largest marked rank below ours = previous obstacle.
                int previous = -1;
                if (below > 0) {
                    int pos = 0, remaining = below;
                    for (int step = 1 << 16; step > 0; step >>= 1) {
                        int next = pos + step;
                        if (next <= k && fen[next] < remaining) {
                            remaining -= fen[next];
                            pos = next;
                        }
                    }
                    previous = cands[pos];
                }
                fenAdd(rank);
                int lo = max(previous, 0);
                int hi = min(t - 1, span - 1);
                // Everything right of t keeps its old nearest obstacle.
                if (lo <= hi) {
                    update(1, 0, span - 1, lo, hi, t);
                }
            } else {
                int x = q[1], sz = q[2];
                int startHi = x - sz;
                int best = startHi >= 0 ? query(1, 0, span - 1, 0, startHi) : 0;
                result[seen++] = best >= sz;
            }
        }
        return result;
    }
};
