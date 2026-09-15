class Solution {
  public:
    vector<vector<string>> groupStrings(vector<string> &strings) {
        // Anchored key -> position of its group in the groups vector.
        unordered_map<string, int> index;
        vector<vector<string>> groups;
        for (const string &word : strings) {
            // Anchoring on the first letter canonicalizes the shifting
            // sequence: left-shift the string until that letter becomes 'a'
            // — the same gap from it to every letter, mod 26 — so shifted
            // copies produce identical keys and unshiftable strings never
            // collide on one.
            string key;
            for (char letter : word) {
                key += char('a' + (letter - word[0] + 26) % 26);
            }
            auto it = index.find(key);
            // Every word lands in exactly one bucket, alongside precisely
            // its shifts; a first-seen key opens a new group.
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
