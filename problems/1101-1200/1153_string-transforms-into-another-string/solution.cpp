class Solution {
  public:
    bool canConvert(string str1, string str2) {
        if (str1 == str2) {
            // Zero conversions needed; cycles in the mapping never fire.
            return true;
        }
        vector<int> mapping(26, -1);
        vector<bool> target(26, false);
        for (int i = 0; i < (int)str1.size(); ++i) {
            int a = str1[i] - 'a', b = str2[i] - 'a';
            if (mapping[a] != -1 && mapping[a] != b) {
                // One source letter would need two different targets.
                return false;
            }
            mapping[a] = b;
            target[b] = true;
        }
        // A cycle needs a spare letter to break it, and a spare is any
        // letter that never appears as a target.
        int used = count(target.begin(), target.end(), true);
        return used < 26;
    }
};
