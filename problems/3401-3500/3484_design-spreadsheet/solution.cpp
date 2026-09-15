#include <sstream>
#include <string>
#include <unordered_map>

// A hash map from cell reference to its current value. Unset cells simply
// read as 0 through a defaulting lookup, and resetCell writes 0 rather
// than deleting, so every cell state lives in one place. getValue drops
// the leading '=', splits on '+', and classifies each operand by its
// first character: a capital letter means a cell reference, anything else
// is a non-negative integer literal.
class Spreadsheet {
  public:
    Spreadsheet(int rows) {}

    void setCell(string cell, int value) { values_[std::move(cell)] = value; }

    void resetCell(string cell) { values_[std::move(cell)] = 0; }

    int getValue(string formula) {
        for (char &c : formula)
            if (c == '+' || c == '=')
                c = ' ';
        int total = 0;
        istringstream operands(formula);
        string operand;
        while (operands >> operand) {
            if (operand[0] >= 'A' && operand[0] <= 'Z') {
                auto found = values_.find(operand);
                total += found == values_.end() ? 0 : found->second;
            } else {
                total += stoi(operand);
            }
        }
        return total;
    }

  private:
    unordered_map<string, int> values_;
};
