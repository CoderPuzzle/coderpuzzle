class Solution {
  public:
    int createSortedArray(vector<int> &instructions) {
        const long long MOD = 1000000007LL;
        int m = 0;
        for (int x : instructions) {
            m = max(m, x);
        }
        // Fenwick tree indexed by value: prefix counts with point updates.
        vector<long long> tree(m + 1, 0);

        long long total = 0;
        long long count = 0;
        for (int x : instructions) {
            // Inserting x costs the smaller of: elements strictly below x
            // (query(x-1)) and strictly above (count - query(x), since
            // query(x) includes equals — equals land in neither bucket).
            long long less = query(tree, x - 1);
            long long greater = count - query(tree, x);
            total = (total + min(less, greater)) % MOD;
            update(tree, x, m);
            count += 1;
        }
        return (int)total;
    }

  private:
    // Climb the lowbit ladder to add one occurrence of value i.
    void update(vector<long long> &tree, int i, int m) {
        while (i <= m) {
            tree[i] += 1;
            i += i & (-i);
        }
    }

    // Sum of occurrences of values 1..i.
    long long query(vector<long long> &tree, int i) {
        long long s = 0;
        while (i > 0) {
            s += tree[i];
            i -= i & (-i);
        }
        return s;
    }
};
