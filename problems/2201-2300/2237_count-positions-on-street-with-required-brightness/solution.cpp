class Solution {
  public:
    int meetRequirement(int n, vector<vector<int>> &lights, vector<int> &requirement) {
        vector<long long> delta(n + 1, 0);
        for (auto &light : lights) {
            long long position = light[0], range = light[1];
            delta[max(0LL, position - range)]++;
            delta[min(static_cast<long long>(n), position + range + 1)]--;
        }
        long long brightness = 0;
        int count = 0;
        for (int i = 0; i < n; i++) {
            brightness += delta[i];
            if (brightness >= requirement[i]) {
                count++;
            }
        }
        return count;
    }
};
