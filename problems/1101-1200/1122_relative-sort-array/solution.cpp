class Solution {
  public:
    vector<int> relativeSortArray(vector<int> &arr1, vector<int> &arr2) {
        // Rank in arr2 for present values; absent ones share the sentinel
        // rank arr2.size() and then compare by value (ascending at the end).
        unordered_map<int, int> rank;
        for (int i = 0; i < (int)arr2.size(); ++i)
            rank[arr2[i]] = i;
        int tail = (int)arr2.size();
        vector<int> out = arr1;
        auto key = [&](int value) {
            auto found = rank.find(value);
            int r = (found == rank.end()) ? tail : found->second;
            return r * 2000 + value; // ranks < 1000, values <= 1000 < 2000
        };
        stable_sort(out.begin(), out.end(), [&](int a, int b) { return key(a) < key(b); });
        return out;
    }
};
