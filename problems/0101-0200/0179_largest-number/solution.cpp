class Solution {
  public:
    string largestNumber(vector<int> &nums) {
        vector<string> strs;
        strs.reserve(nums.size());
        for (int n : nums) {
            strs.push_back(to_string(n));
        }
        // a precedes b exactly when the concatenation a + b beats b + a —
        // numeric comparison is useless (3 must come before 30). A sorted
        // result admits no adjacent swap that enlarges the string, so it is
        // the maximal arrangement.
        sort(strs.begin(), strs.end(), [](const string &a, const string &b) { return a + b > b + a; });
        string result;
        for (const string &s : strs) {
            result += s;
        }
        // Leading zero means every input was 0.
        return result[0] == '0' ? "0" : result;
    }
};
