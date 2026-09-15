class Solution {
    struct Node {
        int val;
        unsigned prio;
        int size, xr;
        bool rev;
        Node *l, *r;
    };

    vector<Node> pool;
    int poolTop = 0;
    unsigned seed = 123456789u;

    unsigned nextPrio() {
        seed = (seed * 1103515245u + 12345u) & 0x7fffffffu;
        return seed;
    }

    Node *make(int val) {
        Node *t = &pool[poolTop++];
        t->val = val;
        t->prio = nextPrio();
        t->size = 1;
        t->xr = val;
        t->rev = false;
        t->l = t->r = nullptr;
        return t;
    }

    static int sz(Node *t) { return t ? t->size : 0; }
    static int xr(Node *t) { return t ? t->xr : 0; }

    void push(Node *t) {
        if (t && t->rev) {
            t->rev = false;
            swap(t->l, t->r);
            if (t->l)
                t->l->rev = !t->l->rev;
            if (t->r)
                t->r->rev = !t->r->rev;
        }
    }

    void pull(Node *t) {
        if (t) {
            t->size = 1 + sz(t->l) + sz(t->r);
            t->xr = t->val ^ xr(t->l) ^ xr(t->r);
        }
    }

    Node *merge(Node *a, Node *b) {
        if (!a || !b)
            return a ? a : b;
        push(a);
        push(b);
        if (a->prio < b->prio) {
            a->r = merge(a->r, b);
            pull(a);
            return a;
        }
        b->l = merge(a, b->l);
        pull(b);
        return b;
    }

    // Split into (first k nodes, the rest).
    pair<Node *, Node *> split(Node *t, int k) {
        if (!t)
            return {nullptr, nullptr};
        push(t);
        int left = sz(t->l);
        if (k <= left) {
            auto [a, b] = split(t->l, k);
            t->l = b;
            pull(t);
            return {a, t};
        }
        auto [a, b] = split(t->r, k - left - 1);
        t->r = a;
        pull(t);
        return {t, b};
    }

  public:
    vector<int> getResults(vector<int> &nums, vector<vector<int>> &queries) {
        pool.assign(nums.size(), Node());
        poolTop = 0;
        Node *root = nullptr;
        for (int value : nums)
            root = merge(root, make(value));

        vector<int> out;
        for (auto &q : queries) {
            int typ = q[0];
            if (typ == 1) {
                int index = q[1], value = q[2];
                auto [a, b] = split(root, index);
                auto [mid, c] = split(b, 1);
                mid->val = value;
                mid->xr = value;
                root = merge(a, merge(mid, c));
            } else if (typ == 2) {
                int l = q[1], r = q[2];
                auto [a, b] = split(root, l);
                auto [mid, c] = split(b, r - l + 1);
                out.push_back(xr(mid));
                root = merge(a, merge(mid, c));
            } else {
                int l = q[1], r = q[2];
                auto [a, b] = split(root, l);
                auto [mid, c] = split(b, r - l + 1);
                mid->rev = !mid->rev;
                root = merge(a, merge(mid, c));
            }
        }
        return out;
    }
};
