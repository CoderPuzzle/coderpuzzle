class Solution {
  public:
    vector<double> getCollisionTimes(vector<vector<int>> &cars) {
        int n = cars.size();
        vector<double> answer(n, -1.0);
        vector<int> stackVec;
        // Right-to-left scan; the stack holds cars still free-wheeling, the
        // possible first collisions for everything to their left.
        for (int i = n - 1; i >= 0; i--) {
            int position = cars[i][0], speed = cars[i][1];
            // A car at least as fast ahead can never be caught — pop it.
            while (!stackVec.empty() && speed <= cars[stackVec.back()][1]) {
                stackVec.pop_back();
            }
            while (!stackVec.empty()) {
                int j = stackVec.back();
                // When i would reach j, assuming j keeps its speed.
                double t = (double)(cars[j][0] - position) / (double)(speed - cars[j][1]);
                // If j merges earlier, it has slowed before i arrives: it is
                // no first collision for i (nor for anyone further left), so
                // pop permanently and try the next candidate.
                if (answer[j] > 0 && t >= answer[j]) {
                    stackVec.pop_back();
                } else {
                    answer[i] = t;
                    break;
                }
            }
            stackVec.push_back(i);
        }
        return answer;
    }
};
