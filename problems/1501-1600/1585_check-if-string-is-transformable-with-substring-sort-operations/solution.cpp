class Solution {
  public:
    // 1-indexed Fenwick tree over the n original positions of s, tracking
    // which positions of one particular digit are still unconsumed.
    struct FenwickTree {
        int size;
        vector<int> tree;

        explicit FenwickTree(int n) : size(n), tree(n + 1, 0) {}

        void add(int index, int delta) {
            index += 1;
            while (index <= size) {
                tree[index] += delta;
                index += index & (-index);
            }
        }

        int prefixCount(int index) const {
            int total = 0;
            while (index > 0) {
                total += tree[index];
                index -= index & (-index);
            }
            return total;
        }
    };

    bool isTransformable(string s, string t) {
        int n = (int)s.size();
        if ((int)t.size() != n)
            return false;

        // queue[d]: original positions in s carrying digit d, oldest first.
        array<deque<int>, 10> queue;
        for (int index = 0; index < n; index++) {
            queue[s[index] - '0'].push_back(index);
        }

        // fenwick[d] marks which occurrences of digit d are still
        // unconsumed, so a prefix query answers "how many remaining
        // digit-d positions sit left of index x".
        vector<FenwickTree> fenwick;
        for (int d = 0; d < 10; d++)
            fenwick.emplace_back(n);
        for (int index = 0; index < n; index++) {
            fenwick[s[index] - '0'].add(index, 1);
        }

        for (int i = 0; i < n; i++) {
            int digit = t[i] - '0';
            if (queue[digit].empty())
                return false;
            int pos = queue[digit].front();
            queue[digit].pop_front();
            // any remaining strictly-smaller digit still left of pos
            // permanently blocks it: sorting only lets pos move left past
            // digits strictly greater than it, never past a smaller one.
            int blocked = 0;
            for (int smaller = 0; smaller < digit; smaller++) {
                blocked += fenwick[smaller].prefixCount(pos);
            }
            if (blocked != 0)
                return false;
            fenwick[digit].add(pos, -1);
        }

        return true;
    }
};
