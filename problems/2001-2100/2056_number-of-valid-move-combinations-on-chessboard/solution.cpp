class Solution {
    struct Move {
        int dr;
        int dc;
        int steps;
    };

  public:
    int countCombinations(vector<string> &pieces, vector<vector<int>> &positions) {
        vector<vector<Move>> options;
        for (int index = 0; index < static_cast<int>(pieces.size()); ++index) {
            options.push_back(movesFor(pieces[index], positions[index]));
        }
        vector<Move> chosen;
        return search(0, positions, options, chosen);
    }

  private:
    vector<Move> movesFor(const string &piece, const vector<int> &position) {
        vector<pair<int, int>> directions;
        if (piece != "bishop") {
            directions.insert(directions.end(), {{1, 0}, {-1, 0}, {0, 1}, {0, -1}});
        }
        if (piece != "rook") {
            directions.insert(directions.end(), {{1, 1}, {1, -1}, {-1, 1}, {-1, -1}});
        }
        vector<Move> moves = {{0, 0, 0}};
        for (auto [dr, dc] : directions) {
            for (int steps = 1;; ++steps) {
                int row = position[0] + dr * steps;
                int column = position[1] + dc * steps;
                if (row < 1 || row > 8 || column < 1 || column > 8) {
                    break;
                }
                moves.push_back({dr, dc, steps});
            }
        }
        return moves;
    }

    int search(int index, const vector<vector<int>> &positions, const vector<vector<Move>> &options,
               vector<Move> &chosen) {
        if (index == static_cast<int>(options.size())) {
            return 1;
        }
        int total = 0;
        for (const Move &move : options[index]) {
            bool valid = true;
            for (int other = 0; other < index && valid; ++other) {
                valid = compatible(index, move, other, chosen[other], positions);
            }
            if (valid) {
                chosen.push_back(move);
                total += search(index + 1, positions, options, chosen);
                chosen.pop_back();
            }
        }
        return total;
    }

    bool compatible(int index, const Move &move, int other, const Move &otherMove,
                    const vector<vector<int>> &positions) {
        for (int second = 0; second <= 7; ++second) {
            int row = positions[index][0] + move.dr * min(second, move.steps);
            int column = positions[index][1] + move.dc * min(second, move.steps);
            int otherRow = positions[other][0] + otherMove.dr * min(second, otherMove.steps);
            int otherColumn = positions[other][1] + otherMove.dc * min(second, otherMove.steps);
            if (row == otherRow && column == otherColumn) {
                return false;
            }
        }
        return true;
    }
};
