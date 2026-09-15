class Solution {
  public:
    int maximumGroups(vector<int> &grades) {
        long long doubled = 8LL * grades.size() + 1;
        int root = sqrt((double)doubled);
        while ((long long)(root + 1) * (root + 1) <= doubled) {
            root++;
        }
        while ((long long)root * root > doubled) {
            root--;
        }
        return (root - 1) / 2;
    }
};
