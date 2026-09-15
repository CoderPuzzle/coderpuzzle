class Solution {
  public:
    string removeSubstring(string s, int k) {
        // Run-length stack: each entry is one maximal run, char plus count.
        vector<pair<char, int>> stack;
        for (char ch : s) {
            if (!stack.empty() && stack.back().first == ch) {
                stack.back().second++;
            } else {
                stack.push_back({ch, 1});
            }
            // A ')' run sitting on a '(' run is a live junction: cancel
            // min(open / k, close / k) whole blocks of k from both sides.
            while (stack.size() > 1 && stack.back().first == ')' && stack[stack.size() - 2].first == '(') {
                int blocks = min(stack[stack.size() - 2].second / k, stack.back().second / k);
                if (blocks == 0) {
                    break;
                }
                pair<char, int> close = stack.back();
                pair<char, int> below = stack[stack.size() - 2];
                stack.pop_back();
                stack.pop_back();
                below.second -= blocks * k;
                close.second -= blocks * k;
                // Survivors go back on top, merging equal-char neighbours;
                // a merge can expose another junction one level down.
                for (pair<char, int> run : {below, close}) {
                    if (run.second > 0) {
                        if (!stack.empty() && stack.back().first == run.first) {
                            stack.back().second += run.second;
                        } else {
                            stack.push_back(run);
                        }
                    }
                }
            }
        }
        // The surviving runs are the irreducible string.
        string result;
        for (const pair<char, int> &run : stack) {
            result.append(run.second, run.first);
        }
        return result;
    }
};
