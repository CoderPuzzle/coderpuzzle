class Solution {
  public:
    string similarRGB(string color) {
        // A shorthand color repeats one hex digit per channel, so the
        // candidates for one channel are 0x00, 0x11, ..., 0xff — sixteen
        // values spaced 17 apart. The similarity is a sum of independent
        // per-channel squares, so the most similar shorthand takes,
        // channel by channel, the repeated value nearest the input's:
        // digit (value + 8) / 17 in integers. The spacing 17 is odd, so
        // a channel value is never exactly between two candidates — the
        // nearest, and with it the whole answer, is unique.
        const string digits = "0123456789abcdef";
        string out = "#";
        for (int i = 1; i <= 5; i += 2) {
            int value = stoi(color.substr(i, 2), nullptr, 16);
            char c = digits[(value + 8) / 17];
            out += c;
            out += c;
        }
        return out;
    }
};
