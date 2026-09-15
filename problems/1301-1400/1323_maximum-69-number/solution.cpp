class Solution {
  public:
    int maximum69Number(int num) {
        // The leftmost 6 carries the most weight, so flipping it is the one
        // best change; no 6 at all means the number is already maximal.
        string text = to_string(num);
        size_t at = text.find('6');
        if (at != string::npos) {
            text[at] = '9';
        }
        return stoi(text);
    }
};
