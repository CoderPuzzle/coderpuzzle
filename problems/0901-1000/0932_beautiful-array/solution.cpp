class Solution {
  public:
    vector<int> beautifulArray(int n) {
        // The judge pins one exact answer: the standard parity
        // divide-and-conquer, built bottom-up. Each pass rewrites every value
        // x as 2 * x - 1 (front block) and 2 * x (back block) — the blocks
        // stay beautiful among themselves, and an odd-plus-even average is
        // odd, never twice a middle value — until at least n values exist;
        // values above n are then dropped in one sweep.
        vector<int> current;
        current.push_back(1);
        while (current.size() < static_cast<size_t>(n)) {
            vector<int> doubled;
            doubled.reserve(current.size() * 2);
            for (int value : current) {
                doubled.push_back(2 * value - 1);
            }
            for (int value : current) {
                doubled.push_back(2 * value);
            }
            current = doubled;
        }
        vector<int> answer;
        answer.reserve(n);
        for (int value : current) {
            if (value <= n) {
                answer.push_back(value);
            }
        }
        return answer;
    }
};
