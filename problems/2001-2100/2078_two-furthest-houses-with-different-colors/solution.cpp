class Solution {
  public:
    int maxDistance(vector<int> &colors) {
        int last = static_cast<int>(colors.size()) - 1;
        int answer = 0;
        for (int index = 0; index <= last; ++index) {
            if (colors[index] != colors[0]) {
                answer = max(answer, index);
            }
            if (colors[index] != colors[last]) {
                answer = max(answer, last - index);
            }
        }
        return answer;
    }
};
