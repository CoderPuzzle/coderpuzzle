class Solution {
  public:
    vector<int> recoverOrder(vector<int> &order, vector<int> &friends) {
        // The roster is capped at eight ids, so a hash set answers every
        // membership test in O(1) expected time.
        unordered_set<int> wanted(friends.begin(), friends.end());
        // Scanning order left to right makes the kept ids emerge already in
        // finishing order -- no sorting step is needed.
        vector<int> ans;
        ans.reserve(friends.size());
        for (int racer : order) {
            if (wanted.count(racer)) {
                ans.push_back(racer);
            }
        }
        return ans;
    }
};
