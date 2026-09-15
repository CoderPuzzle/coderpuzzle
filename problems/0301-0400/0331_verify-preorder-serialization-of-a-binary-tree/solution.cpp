class Solution {
  public:
    bool isValidSerialization(string preorder) {
        // slots counts tree positions still waiting to be filled — one for the
        // root at the start. Each token fills one slot; a number then opens two
        // more for its children, a '#' opens none. The serialization is valid
        // exactly when no token arrives after the slots run out and the last
        // token closes the last one, so no tree is ever built.
        int slots = 1;
        int i = 0;
        int n = (int)preorder.size();
        while (i < n) {
            // A token with no open slot has nowhere to live: the tree this
            // string describes was already finished earlier.
            if (slots == 0)
                return false;
            --slots;
            // Only the first character of a token matters: a valid token is
            // either a number or the one-character '#'.
            bool isNull = preorder[i] == '#';
            while (i < n && preorder[i] != ',')
                ++i;
            ++i; // step past the comma (harmless past the last token)
            if (!isNull)
                slots += 2;
        }
        return slots == 0;
    }
};
