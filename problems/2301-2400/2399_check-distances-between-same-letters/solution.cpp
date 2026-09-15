class Solution {
  public:
    bool checkDistances(string s, vector<int> &distance) {
        // Remember each letter's first index; on the second sighting
        // the letters strictly between number second - first - 1,
        // which must equal that letter's distance entry.
        array<int, 26> first{};
        first.fill(-1);
        for (int i = 0; i < (int)s.size(); ++i) {
            int k = s[i] - 'a';
            if (first[k] < 0) {
                first[k] = i;
            } else if (i - first[k] - 1 != distance[k]) {
                return false;
            }
        }
        return true;
    }
};
