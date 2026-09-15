class Solution {
  public:
    vector<string> findRestaurant(vector<string> &list1, vector<string> &list2) {
        // The strings of each list are unique, so one map from a string to
        // its index in list1 settles every "where does it count from" query.
        unordered_map<string, int> indexOf;
        for (int i = 0; i < (int)list1.size(); ++i)
            indexOf[list1[i]] = i;
        int best = 0;
        vector<string> result;
        for (int j = 0; j < (int)list2.size(); ++j) {
            auto found = indexOf.find(list2[j]);
            if (found == indexOf.end())
                continue;
            // A strictly smaller index sum restarts the winners at the new
            // minimum; an equal one extends the tie, so the winners come out
            // in the order they appear in list2.
            if (result.empty() || found->second + j < best) {
                best = found->second + j;
                result = {list2[j]};
            } else if (found->second + j == best) {
                result.push_back(list2[j]);
            }
        }
        return result;
    }
};
