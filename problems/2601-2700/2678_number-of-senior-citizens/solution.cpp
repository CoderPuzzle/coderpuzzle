class Solution {
  public:
    int countSeniors(vector<string> &details) {
        // The age is the two-digit field at offsets 11-12; char-code
        // arithmetic decodes it without building a substring. The count is
        // at most details.size() <= 100, so int is plenty.
        int count = 0;
        for (const auto &record : details) {
            int age = (record[11] - '0') * 10 + (record[12] - '0');
            if (age > 60) {
                ++count;
            }
        }
        return count;
    }
};
