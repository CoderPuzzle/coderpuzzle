class Solution {
  public:
    vector<string> divideString(string s, int k, string fill) {
        int padding = (k - static_cast<int>(s.size()) % k) % k;
        s.append(padding, fill[0]);

        vector<string> groups;
        for (int start = 0; start < static_cast<int>(s.size()); start += k) {
            groups.push_back(s.substr(start, k));
        }
        return groups;
    }
};
