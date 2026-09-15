class Solution {
  public:
    int minAbsoluteDifference(vector<int> &nums, int x) {
        // A pair consists of two distinct indices, so x == 0 still demands a
        // separation of at least one index step. Every value fits in int and
        // any difference stays below 10^9.
        int separation = max(x, 1);
        vector<int> vals(nums);
        sort(vals.begin(), vals.end());
        vals.erase(unique(vals.begin(), vals.end()), vals.end());
        int m = static_cast<int>(vals.size());
        vector<int> tree(m + 1, 0);
        int top = 1;
        while (top * 2 <= m) {
            top *= 2;
        }
        auto rank_of = [&](int value) {
            return static_cast<int>(lower_bound(vals.begin(), vals.end(), value) - vals.begin()) + 1;
        };
        int answer = -1;
        for (int j = 0; j < static_cast<int>(nums.size()); j++) {
            if (j >= separation) {
                // Partner nums[j - separation] enters the eligible prefix
                // before nums[j] queries it.
                for (int i = rank_of(nums[j - separation]); i <= m; i += i & (-i)) {
                    tree[i] += 1;
                }
                int value = nums[j];
                int count = 0;
                for (int i = rank_of(value); i > 0; i -= i & (-i)) {
                    count += tree[i];
                }
                int have = j - separation + 1;
                if (count > 0) {
                    int pos = 0;
                    int rem = count;
                    for (int step = top; step > 0; step >>= 1) {
                        int nxt = pos + step;
                        if (nxt <= m && tree[nxt] < rem) {
                            pos = nxt;
                            rem -= tree[nxt];
                        }
                    }
                    int difference = value - vals[pos];
                    if (answer < 0 || difference < answer) {
                        answer = difference;
                    }
                }
                if (have > count) {
                    int pos = 0;
                    int rem = count + 1;
                    for (int step = top; step > 0; step >>= 1) {
                        int nxt = pos + step;
                        if (nxt <= m && tree[nxt] < rem) {
                            pos = nxt;
                            rem -= tree[nxt];
                        }
                    }
                    int difference = vals[pos] - value;
                    if (answer < 0 || difference < answer) {
                        answer = difference;
                    }
                }
            }
        }
        return answer;
    }
};
