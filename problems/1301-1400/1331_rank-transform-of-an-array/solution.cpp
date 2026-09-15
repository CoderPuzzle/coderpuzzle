class Solution {
  public:
    vector<int> arrayRankTransform(vector<int> &arr) {
        // Rank = position in the sorted distinct values, 1-based; the map is
        // then applied in input order so the output preserves positions.
        vector<int> distinct(arr);
        sort(distinct.begin(), distinct.end());
        distinct.erase(unique(distinct.begin(), distinct.end()), distinct.end());
        unordered_map<int, int> ranks;
        for (int index = 0; index < (int)distinct.size(); ++index) {
            ranks[distinct[index]] = index + 1;
        }
        vector<int> out(arr.size());
        for (int i = 0; i < (int)arr.size(); ++i) {
            out[i] = ranks[arr[i]];
        }
        return out;
    }
};
