class Solution {
  public:
    vector<vector<int>> highFive(vector<vector<int>> &items) {
        // Bucket every score by student, sort each bucket descending, and
        // average the top five with integer division.
        unordered_map<int, vector<int>> scores;
        for (const auto &item : items) {
            scores[item[0]].push_back(item[1]);
        }
        vector<int> ids;
        for (const auto &[sid, _] : scores)
            ids.push_back(sid);
        sort(ids.begin(), ids.end());
        vector<vector<int>> result;
        for (int sid : ids) {
            auto &list = scores[sid];
            sort(list.rbegin(), list.rend());
            int total = 0;
            for (int i = 0; i < 5; ++i)
                total += list[i];
            result.push_back({sid, total / 5});
        }
        return result;
    }
};
