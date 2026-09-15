class Solution {
  public:
    int numberOfWeakCharacters(vector<vector<int>> &properties) {
        // Attack descending; defense ASCENDING within equal attack so that
        // same-attack characters (who can never weaken each other) only
        // ever meet a running max from strictly higher-attack groups.
        vector<vector<int>> props(properties);
        sort(props.begin(), props.end(), [](const vector<int> &a, const vector<int> &b) {
            if (a[0] != b[0]) {
                return a[0] > b[0];
            }
            return a[1] < b[1];
        });
        int weak = 0;
        // Every earlier character has attack >= the current one's, so the
        // current one is weak exactly when some seen defense is strictly
        // greater -- one running maximum is enough.
        int maxDefense = 0;
        for (const vector<int> &p : props) {
            if (p[1] < maxDefense) {
                weak++;
            } else {
                // Raise the max only when not weak, so later (lower-attack)
                // groups compare against it.
                maxDefense = p[1];
            }
        }
        return weak;
    }
};
