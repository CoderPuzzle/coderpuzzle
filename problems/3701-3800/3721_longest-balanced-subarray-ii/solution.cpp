class SegTree {
    int n;
    vector<int> mn, mx, lazy;

    void build(int node, int nl, int nr, const vector<int> &values) {
        if (nl == nr) {
            mn[node] = mx[node] = values[nl];
            return;
        }
        int mid = (nl + nr) / 2;
        build(node * 2, nl, mid, values);
        build(node * 2 + 1, mid + 1, nr, values);
        mn[node] = min(mn[node * 2], mn[node * 2 + 1]);
        mx[node] = max(mx[node * 2], mx[node * 2 + 1]);
    }

    void push(int node) {
        int z = lazy[node];
        if (z != 0) {
            for (int c : {node * 2, node * 2 + 1}) {
                mn[c] += z;
                mx[c] += z;
                lazy[c] += z;
            }
            lazy[node] = 0;
        }
    }

    void add(int node, int nl, int nr, int ql, int qr, int delta) {
        if (ql <= nl && nr <= qr) {
            mn[node] += delta;
            mx[node] += delta;
            lazy[node] += delta;
            return;
        }
        push(node);
        int mid = (nl + nr) / 2;
        if (ql <= mid) {
            add(node * 2, nl, mid, ql, qr, delta);
        }
        if (qr > mid) {
            add(node * 2 + 1, mid + 1, nr, ql, qr, delta);
        }
        mn[node] = min(mn[node * 2], mn[node * 2 + 1]);
        mx[node] = max(mx[node * 2], mx[node * 2 + 1]);
    }

    int rightmost(int node, int nl, int nr, int ql, int qr) {
        if (qr < nl || nr < ql) {
            return -1;
        }
        if (ql <= nl && nr <= qr) {
            if (mn[node] > 0 || mx[node] < 0) {
                return -1;
            }
            if (nl == nr) {
                return nl;
            }
            push(node);
            int mid = (nl + nr) / 2;
            int res = rightmost(node * 2 + 1, mid + 1, nr, ql, qr);
            if (res != -1) {
                return res;
            }
            return rightmost(node * 2, nl, mid, ql, qr);
        }
        push(node);
        int mid = (nl + nr) / 2;
        int res = rightmost(node * 2 + 1, mid + 1, nr, ql, qr);
        if (res != -1) {
            return res;
        }
        return rightmost(node * 2, nl, mid, ql, qr);
    }

  public:
    explicit SegTree(const vector<int> &values) {
        n = values.size();
        mn.assign(4 * n, 0);
        mx.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
        build(1, 0, n - 1, values);
    }

    void addRange(int ql, int qr, int delta) { add(1, 0, n - 1, ql, qr, delta); }

    int rightmostZero(int ql, int qr) { return rightmost(1, 0, n - 1, ql, qr); }
};

class Solution {
  public:
    int longestBalanced(vector<int> &nums) {
        int n = nums.size();
        // first occurrence of each value (seeds balance(0, r)) and the next
        // occurrence of each position (tells where a value stops mattering).
        unordered_map<int, int> first;
        vector<int> nxt(n, n);
        unordered_map<int, int> last;
        for (int i = n - 1; i >= 0; i--) {
            int v = nums[i];
            if (last.count(v)) {
                nxt[i] = last[v];
            }
            last[v] = i;
        }
        for (int i = 0; i < n; i++) {
            if (!first.count(nums[i])) {
                first[nums[i]] = i;
            }
        }
        // Seed balance(0, r): each value contributes its sign to every right
        // end at or after its first occurrence, via O(log n) range adds.
        SegTree tree(vector<int>(n, 0));
        for (auto &kv : first) {
            int v = kv.first, p = kv.second;
            tree.addRange(p, n - 1, (v & 1) ? 1 : -1);
        }
        int best = 0;
        for (int l = 0; l < n; l++) {
            int r = tree.rightmostZero(l, n - 1);
            if (r != -1) {
                best = max(best, r - l + 1);
            }
            int v = nums[l];
            int s = (v & 1) ? 1 : -1;
            if (nxt[l] > l) {
                tree.addRange(l, nxt[l] - 1, -s);
            }
        }
        return best;
    }
};
