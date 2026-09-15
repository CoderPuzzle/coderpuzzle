#include <string>
#include <vector>

class Solution {
  public:
    int calPoints(vector<string> &operations) {
        // Every operation only ever touches the end of the record: a literal
        // pushes, the double and the sum read the last entry (or the last
        // two) and push, the cancel pops. Replaying the operations left to
        // right on a stack is therefore the whole computation, and the answer
        // is the sum of what is left — 0 when the record ends empty.
        vector<int> record;
        for (const string &op : operations) {
            if (op == "+") {
                int top = record.back();
                record.push_back(top + record[record.size() - 2]);
            } else if (op == "D") {
                record.push_back(2 * record.back());
            } else if (op == "C") {
                record.pop_back();
            } else {
                record.push_back(stoi(op));
            }
        }
        int total = 0;
        for (int score : record) {
            total += score;
        }
        return total;
    }
};
