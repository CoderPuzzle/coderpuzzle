class Solution {
  public:
    int countKeyChanges(string s) {
        string keys = s;
        for (char &c : keys) {
            c = tolower(c);
        }
        int changes = 0;
        for (int i = 1; i < static_cast<int>(keys.size()); i++) {
            if (keys[i] != keys[i - 1]) {
                changes++;
            }
        }
        return changes;
    }
};
