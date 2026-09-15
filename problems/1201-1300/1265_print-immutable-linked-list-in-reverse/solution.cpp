class ImmutableListNode;

class Solution {
  public:
    void printLinkedListInReverse(ImmutableListNode &head) {
        // Forward is the only direction the API offers, and output must run
        // backward — recurse on a pointer that walks the next chain, since
        // only the head arrives by reference; null marks the end of the
        // list.
        recurse(&head);
    }

  private:
    void recurse(ImmutableListNode *node) {
        if (node == nullptr) {
            return;
        }
        recurse(node->getNext());
        node->printValue();
    }
};
