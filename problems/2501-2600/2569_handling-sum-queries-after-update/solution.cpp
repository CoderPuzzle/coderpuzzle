class Solution {
    vector<long long> tree;
    vector<char> lazy;
    int n;

    void build(int node, int lo, int hi, vector<int> &arr) {
        if (lo == hi) {
            tree[node] = arr[lo];
            return;
        }
        int mid = (lo + hi) >> 1;
        build(node * 2, lo, mid, arr);
        build(node * 2 + 1, mid + 1, hi, arr);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }

    void applyFlip(int node, int lo, int hi) {
        // Flipping a 0/1 segment swaps every bit, so its sum of ones
        // becomes segment_length - sum; the children's flip is deferred.
        tree[node] = (long long)(hi - lo + 1) - tree[node];
        lazy[node] = !lazy[node];
    }

    void push(int node, int lo, int hi) {
        // lazy means "children's data is stale": hand the pending flip to
        // both children and clear it before recursing below this node.
        if (lazy[node]) {
            int mid = (lo + hi) >> 1;
            applyFlip(node * 2, lo, mid);
            applyFlip(node * 2 + 1, mid + 1, hi);
            lazy[node] = 0;
        }
    }

    void flip(int node, int lo, int hi, int ql, int qr) {
        if (ql > hi || qr < lo) {
            return;
        }
        // A node fully inside [ql, qr] applies the flip locally and stops,
        // so a range flip touches O(log n) nodes, not O(r - l).
        if (ql <= lo && hi <= qr) {
            applyFlip(node, lo, hi);
            return;
        }
        push(node, lo, hi);
        int mid = (lo + hi) >> 1;
        flip(node * 2, lo, mid, ql, qr);
        flip(node * 2 + 1, mid + 1, hi, ql, qr);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }

  public:
    vector<long long> handleQuery(vector<int> &nums1, vector<int> &nums2, vector<vector<int>> &queries) {
        n = (int)nums1.size();
        tree.assign(4 * max(1, n), 0);
        lazy.assign(4 * max(1, n), 0);
        if (n > 0) {
            build(1, 0, n - 1, nums1);
        }
        // Maintain sum(nums2) incrementally: nums2 is never materialized
        // or rescanned (n, q up to 1e5 and values up to 1e9).
        long long total = 0;
        for (int x : nums2) {
            total += x;
        }
        vector<long long> answers;
        for (auto &q : queries) {
            int kind = q[0];
            if (kind == 1) {
                flip(1, 0, n - 1, q[1], q[2]);
            } else if (kind == 2) {
                // nums2[i] += nums1[i] * p shifts the total by exactly
                // p times the current number of ones at the root.
                total += (long long)q[1] * tree[1];
            } else {
                answers.push_back(total);
            }
        }
        return answers;
    }
};
