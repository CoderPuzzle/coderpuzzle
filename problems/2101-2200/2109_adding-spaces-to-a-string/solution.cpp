class Solution {
  public:
    string addSpaces(string s, vector<int> &spaces) {
        string result;
        result.reserve(s.size() + spaces.size());
        int spaceIndex = 0;
        for (int index = 0; index < static_cast<int>(s.size()); index++) {
            if (spaceIndex < static_cast<int>(spaces.size()) && spaces[spaceIndex] == index) {
                result.push_back(' ');
                spaceIndex++;
            }
            result.push_back(s[index]);
        }
        return result;
    }
};
