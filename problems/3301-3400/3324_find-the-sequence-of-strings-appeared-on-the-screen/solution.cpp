class Solution {
  public:
    vector<string> stringSequence(string target) {
        // Minimum presses are forced: each new position starts with key 1
        // (key 2 on an empty screen is impossible), appending 'a', and key
        // 2 then advances that last character (c - 'a') times to the
        // wanted one. The screen states therefore stream out
        // deterministically — for each position, emit the string after the
        // append and again after every advance — which is exactly the
        // sequence of all strings that ever appear.
        vector<string> states;
        string screen;
        for (char c : target) {
            screen.push_back('a');
            states.push_back(screen);
            for (char d = 'b'; d <= c; ++d) {
                screen.back() = d;
                states.push_back(screen);
            }
        }
        return states;
    }
};
