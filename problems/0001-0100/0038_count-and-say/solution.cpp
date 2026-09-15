class Solution {
  public:
    string countAndSay(int n) {
        // The first term is fixed; each later term is the run-length encoding
        // of the one before it, so n - 1 encoding passes reach the nth term.
        string term = "1";
        for (int step = 1; step < n; ++step) {
            string next;
            int index = 0;
            while (index < (int)term.size()) {
                // Measure the maximal run starting at index: the group the
                // encoder must emit as <count><digit>, then skip past it.
                int run = 1;
                while (index + run < (int)term.size() && term[index + run] == term[index])
                    ++run;
                next += to_string(run);
                next += term[index];
                index += run;
            }
            term = next;
        }
        return term;
    }
};
