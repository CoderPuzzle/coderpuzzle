class Solution {
  public:
    vector<int> circularGameLosers(int n, int k) {
        // Straight simulation: friend 1 holds the ball at the start, and each
        // turn i moves the holder i*k seats clockwise. At most n turns pass
        // before some friend receives the ball twice; i*k <= 2500 so int
        // arithmetic never overflows.
        vector<bool> received(n, false);
        received[0] = true;
        int holder = 0;
        int turn = 1;
        while (true) {
            holder = (holder + turn * k) % n;
            if (received[holder]) {
                break;
            }
            received[holder] = true;
            ++turn;
        }
        vector<int> answer;
        for (int i = 0; i < n; ++i) {
            if (!received[i]) {
                answer.push_back(i + 1);
            }
        }
        return answer;
    }
};
