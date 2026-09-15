#include <vector>

// Two read positions — one per vector — and a turn flag naming the vector
// that serves next. Nothing is flattened or queued at construction: the
// whole zigzag policy lives in next, which hands the turn to the other
// vector when the one whose turn it is has run dry. hasNext is a pure
// query — one live index anywhere means elements remain — so it never
// mutates state and any number of calls between nexts is harmless.
class ZigzagIterator {
  public:
    ZigzagIterator(vector<int> v1, vector<int> v2) : v1(v1), v2(v2) {
        // No copies beyond the members, no queue: only how far each vector
        // has been served and whose turn is next (0 for v1, 1 for v2).
    }

    int next() {
        // A vector whose turn it is may have run dry — it was the shorter
        // one, or its last element was just served — and then the turn
        // passes to the other before anything is read.
        if (turn == 0 && i1 == (int)v1.size()) {
            turn = 1;
        }
        if (turn == 1 && i2 == (int)v2.size()) {
            turn = 0;
        }
        int value;
        if (turn == 0) {
            value = v1[i1];
            ++i1;
        } else {
            value = v2[i2];
            ++i2;
        }
        // Serve one element, then hand the turn over unconditionally: the
        // vectors alternate strictly while both still have elements.
        turn = 1 - turn;
        return value;
    }

    bool hasNext() {
        // Pure query: the turn flag is irrelevant to whether anything
        // remains — one live index anywhere means yes.
        return i1 < (int)v1.size() || i2 < (int)v2.size();
    }

  private:
    vector<int> v1;
    vector<int> v2;
    int i1 = 0;
    int i2 = 0;
    int turn = 0;
};
