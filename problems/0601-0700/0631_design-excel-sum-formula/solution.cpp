#include <string>
#include <utility>
#include <vector>

// Cell values beside per-cell formula lists, both plain grids: set()
// writes the literal and empties the cell's formula list; sum() installs
// the flattened reference list parsed from numbers; get() resolves on
// demand, recursing through formula cells so a later set() on a source
// cell is picked up by the next get() of anything downstream.
class Excel {
  public:
    Excel(int height, string width)
        : values(height + 1, vector<int>(width[0] - 'A' + 1)),
          formulas(height + 1, vector<vector<pair<int, int>>>(width[0] - 'A' + 1)) {}

    void set(int row, string column, int val) {
        int col = column[0] - 'A';
        values[row][col] = val;
        formulas[row][col].clear();
    }

    int get(int row, string column) { return value(row, column[0] - 'A'); }

    int sum(int row, string column, vector<string> numbers) {
        int col = column[0] - 'A';
        vector<pair<int, int>> references;
        for (const string &number : numbers) {
            size_t separator = number.find(':');
            if (separator == string::npos) {
                references.push_back(cell(number));
                continue;
            }
            pair<int, int> first = cell(number.substr(0, separator));
            pair<int, int> last = cell(number.substr(separator + 1));
            for (int r = first.first; r <= last.first; ++r) {
                for (int c = first.second; c <= last.second; ++c) {
                    references.emplace_back(r, c);
                }
            }
        }
        formulas[row][col] = move(references);
        return value(row, col);
    }

  private:
    // A cell token is one column letter followed by the row number.
    pair<int, int> cell(const string &token) { return {stoi(token.substr(1)), token[0] - 'A'}; }

    int value(int row, int col) {
        vector<pair<int, int>> &references = formulas[row][col];
        if (references.empty()) {
            return values[row][col];
        }
        int total = 0;
        // Recursing into each reference is the whole update story: no
        // propagation, no cache, the chain recomputed on every get.
        for (const pair<int, int> &reference : references) {
            total += value(reference.first, reference.second);
        }
        return total;
    }

    vector<vector<int>> values;
    vector<vector<vector<pair<int, int>>>> formulas;
};
