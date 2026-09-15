class Solution {
  public:
    string clearDigits(string s) {
        // Survivors so far form a stack; a digit always removes the closest
        // non-digit still standing to its left, which is exactly its top.
        string kept;
        for (char ch : s) {
            if (ch >= '0' && ch <= '9') {
                kept.pop_back();
            } else {
                kept.push_back(ch);
            }
        }
        return kept;
    }
};
