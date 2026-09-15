class Solution {
  public:
    string slowestKey(vector<int> &releaseTimes, string keysPressed) {
        // A single left-to-right scan computes each duration once and keeps
        // the best (longest duration, then lexicographically largest key).
        int bestDuration = releaseTimes[0];
        char bestChar = keysPressed[0];
        for (int i = 1; i < (int)releaseTimes.size(); ++i) {
            int duration = releaseTimes[i] - releaseTimes[i - 1];
            char c = keysPressed[i];
            if (duration > bestDuration || (duration == bestDuration && c > bestChar)) {
                bestDuration = duration;
                bestChar = c;
            }
        }
        return string(1, bestChar);
    }
};
