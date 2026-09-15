class Solution {
  public:
    int minOperations(string s1, string s2) {
        int selectedEdges = 0;
        bool coveredByPrevious = false;

        for (int i = 0; i < static_cast<int>(s1.size()); ++i) {
            bool needsPair = s1[i] == '1' && s2[i] == '0';
            if (needsPair && !coveredByPrevious) {
                if (s1.size() == 1) {
                    return -1;
                }
                ++selectedEdges;
                coveredByPrevious = i + 1 < static_cast<int>(s1.size());
            } else {
                coveredByPrevious = false;
            }
        }

        return count(s2.begin(), s2.end(), '1') - count(s1.begin(), s1.end(), '1') + 3 * selectedEdges;
    }
};
