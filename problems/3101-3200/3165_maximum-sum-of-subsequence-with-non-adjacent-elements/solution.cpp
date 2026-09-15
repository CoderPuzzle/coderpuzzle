class Solution {
    static const long long MODC = 1000000007LL;
    // sentinel for impossible boundary states; clamped on every merge so
    // sentinel sums cannot cascade into overflow (all valid values have
    // magnitude <= ~5e12, far above HALF)
    static const long long NEG = -(1LL << 60);
    static const long long HALF = NEG / 2;

    vector<array<long long, 4>> tree;

  public:
    int maximumSumSubsequence(vector<int> &nums, vector<vector<int>> &queries) {
        int n = nums.size();
        tree.assign(4 * n, array<long long, 4>{});
        build(1, 0, n, nums);
        long long answer = 0;
        for (auto &q : queries) {
            update(1, 0, n, q[0], q[1]);
            long long best = numeric_limits<long long>::min();
            for (int e = 0; e < 4; e++) {
                best = max(best, tree[1][e]);
            }
            answer = (answer + best) % MODC;
        }
        return (int)answer;
    }

  private:
    // [m00, m01, m10, m11]: [i][j] with i = leftmost taken?, j = rightmost taken?
    static array<long long, 4> leaf(long long x) { return {0, NEG, NEG, x}; }

    static long long addClamped(long long a, long long b) {
        if (a < HALF || b < HALF) {
            return NEG;
        }
        return a + b;
    }

    static array<long long, 4> merge(const array<long long, 4> &left, const array<long long, 4> &right) {
        array<long long, 4> out{};
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                long long b = NEG;
                for (int k = 0; k < 2; k++) {
                    for (int l = 0; l < 2; l++) {
                        if (k == 1 && l == 1) {
                            continue;
                        }
                        long long val = addClamped(left[i * 2 + k], right[l * 2 + j]);
                        if (val > b) {
                            b = val;
                        }
                    }
                }
                out[i * 2 + j] = b;
            }
        }
        return out;
    }

    void build(int node, int lo, int hi, vector<int> &nums) {
        if (hi - lo == 1) {
            tree[node] = leaf(nums[lo]);
            return;
        }
        int mid = (lo + hi) / 2;
        build(node * 2, lo, mid, nums);
        build(node * 2 + 1, mid, hi, nums);
        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    void update(int node, int lo, int hi, int pos, int val) {
        if (hi - lo == 1) {
            tree[node] = leaf(val);
            return;
        }
        int mid = (lo + hi) / 2;
        if (pos < mid) {
            update(node * 2, lo, mid, pos, val);
        } else {
            update(node * 2 + 1, mid, hi, pos, val);
        }
        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }
};
