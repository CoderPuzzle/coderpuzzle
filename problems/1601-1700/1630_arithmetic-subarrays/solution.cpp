class Solution {
  public:
    vector<bool> checkArithmeticSubarrays(vector<int> &nums, vector<int> &l, vector<int> &r) {
        vector<bool> answer(l.size());
        for (int qi = 0; qi < (int)l.size(); qi++) {
            // A set of numbers can be rearranged into an arithmetic
            // sequence exactly when its sorted order already is one.
            vector<int> sub(nums.begin() + l[qi], nums.begin() + r[qi] + 1);
            sort(sub.begin(), sub.end());
            int diff = sub[1] - sub[0];
            bool ok = true;
            for (int i = 2; i < (int)sub.size(); i++) {
                if (sub[i] - sub[i - 1] != diff) {
                    ok = false;
                    break;
                }
            }
            answer[qi] = ok;
        }
        return answer;
    }
};
