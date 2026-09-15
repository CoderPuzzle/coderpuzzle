class Solution {
  public:
    vector<vector<string>> groupAnagrams(vector<string> &strs) {
        // Sorted key -> position of its group in the groups vector.
        unordered_map<string, int> index;
        vector<vector<string>> groups;
        for (const string &word : strs) {
            // Sorting canonicalizes the character multiset: anagrams produce
            // byte-identical keys and non-anagrams can never collide on one.
            string key = word;
            sort(key.begin(), key.end());
            auto it = index.find(key);
            // Every word lands in exactly one bucket, alongside precisely its
            // rearrangements; a first-seen key opens a new group.
            if (it != index.end()) {
                groups[it->second].push_back(word);
            } else {
                index[key] = (int)groups.size();
                groups.push_back({word});
            }
        }
        return groups;
    }
};
