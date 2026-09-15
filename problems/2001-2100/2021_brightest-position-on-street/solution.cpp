class Solution {
  public:
    int brightestPosition(vector<vector<int>> &lights) {
        map<int, int> events;
        for (const auto &light : lights) {
            events[light[0] - light[1]]++;
            events[light[0] + light[1] + 1]--;
        }

        int brightness = 0;
        int bestBrightness = 0;
        int answer = 0;
        for (const auto &[coordinate, delta] : events) {
            brightness += delta;
            if (brightness > bestBrightness) {
                bestBrightness = brightness;
                answer = coordinate;
            }
        }
        return answer;
    }
};
