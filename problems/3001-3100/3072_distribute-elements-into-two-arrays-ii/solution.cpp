class Solution {
  public:
    vector<int> resultArray(vector<int> &nums) {
        // Compress distinct values to 1-based ranks for the two Fenwick trees.
        vector<int> vals = nums;
        sort(vals.begin(), vals.end());
        vals.erase(unique(vals.begin(), vals.end()), vals.end());
        int size = vals.size();
        unordered_map<int, int> comp;
        for (int i = 0; i < size; i++) {
            comp[vals[i]] = i + 1;
        }
        vector<long long> tree1(size + 1, 0), tree2(size + 1, 0);
        auto add = [&](vector<long long> &tree, int i, int delta) {
            for (; i <= size; i += i & (-i))
                tree[i] += delta;
        };
        auto query = [&](vector<long long> &tree, int i) {
            long long s = 0;
            for (; i > 0; i -= i & (-i))
                s += tree[i];
            return s;
        };

        vector<int> arr1, arr2;
        // Seed both arrays and their trees with the first two elements.
        arr1.push_back(nums[0]);
        arr2.push_back(nums[1]);
        add(tree1, comp[nums[0]], 1);
        add(tree2, comp[nums[1]], 1);

        for (int i = 2; i < (int)nums.size(); i++) {
            int x = nums[i];
            // greaterCount = size - prefix count of ranks <= rank(x).
            long long c1 = (long long)arr1.size() - query(tree1, comp[x]);
            long long c2 = (long long)arr2.size() - query(tree2, comp[x]);
            if (c1 > c2) {
                arr1.push_back(x);
                add(tree1, comp[x], 1);
            } else if (c1 < c2) {
                arr2.push_back(x);
                add(tree2, comp[x], 1);
            } else {
                // Equal counts: shorter array wins; ties on length go to arr1.
                if (arr1.size() <= arr2.size()) {
                    arr1.push_back(x);
                    add(tree1, comp[x], 1);
                } else {
                    arr2.push_back(x);
                    add(tree2, comp[x], 1);
                }
            }
        }
        vector<int> ans = arr1;
        ans.insert(ans.end(), arr2.begin(), arr2.end());
        return ans;
    }
};
