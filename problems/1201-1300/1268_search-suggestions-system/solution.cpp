class Solution {
  public:
    vector<vector<string>> suggestedProducts(vector<string> &products, string searchWord) {
        // lexicographic order makes every shared prefix a contiguous run
        vector<string> sorted(products.begin(), products.end());
        sort(sorted.begin(), sorted.end());
        vector<vector<string>> result;
        string prefix;
        for (char ch : searchWord) {
            // grow the prefix one typed character at a time
            prefix.push_back(ch);
            // lower bound: where the run of words >= prefix begins
            auto it = lower_bound(sorted.begin(), sorted.end(), prefix);
            vector<string> suggestions;
            // first three of the run; stop at the first word not sharing
            // the prefix — cost is independent of run length
            for (auto p = it; p != sorted.end() && suggestions.size() < 3; ++p) {
                if (p->compare(0, prefix.size(), prefix) == 0) {
                    suggestions.push_back(*p);
                } else {
                    break;
                }
            }
            result.push_back(move(suggestions));
        }
        return result;
    }
};
