#include <vector>

// Two coordinates — a row pointer and a column pointer — advanced lazily
// over the vector exactly as it stands: the pair is only moved onto a live
// element when a call needs one, so construction does no work beyond
// remembering the input. hasNext owns the skipping: it walks row past every
// row col has exhausted (empty from the start, or fully served), which lets
// next read vec[row][col] without any special cases.
class Vector2D {
  public:
    Vector2D(vector<vector<int>> vec) : vec(vec), row(0), col(0) {
        // No flattened copy here — that laziness is the problem. An empty
        // (or exhausted) row is stepped over only when a call forces it.
    }

    int next() {
        // Establish the invariant before reading: after this call the
        // coordinates are guaranteed to sit on a live element.
        hasNext();
        int value = vec[row][col];
        // Step within the row; once it runs dry, the next hasNext() moves
        // on to the next row instead.
        ++col;
        return value;
    }

    bool hasNext() {
        // The invariant repair: skip rows already drained, zeroing the
        // column pointer as each new row is entered.
        while (row < (int)vec.size() && col == (int)vec[row].size()) {
            ++row;
            col = 0;
        }
        return row < (int)vec.size();
    }

  private:
    vector<vector<int>> vec;
    int row;
    int col;
};
