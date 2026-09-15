class Solution {
  public:
    vector<int> recoverArray(int n, vector<int> &sums) {
        vector<int> cur(sums);
        sort(cur.begin(), cur.end());
        vector<int> res;
        while (cur.size() > 1) {
            int diff = cur[cur.size() - 1] - cur[cur.size() - 2];
            unordered_map<int, int> cnt;
            for (int x : cur) {
                cnt[x]++;
            }
            vector<int> left;  // sums without the candidate element
            vector<int> right; // sums with the candidate element
            for (int x : cur) {
                auto it = cnt.find(x);
                if (it != cnt.end() && it->second > 0) {
                    it->second--;
                    left.push_back(x);
                    cnt[x + diff]--;
                    right.push_back(x + diff);
                }
            }
            bool zeroInLeft = false;
            for (int x : left) {
                if (x == 0) {
                    zeroInLeft = true;
                    break;
                }
            }
            if (zeroInLeft) {
                res.push_back(diff);
                cur.swap(left);
            } else {
                res.push_back(-diff);
                cur.swap(right);
            }
        }
        return res;
    }
};
