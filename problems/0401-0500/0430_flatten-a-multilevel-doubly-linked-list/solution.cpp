class Solution {
  public:
    MultiListNode *flatten(MultiListNode *head) {
        MultiListNode *node = head;
        while (node != nullptr) {
            if (node->child == nullptr) {
                node = node->next;
                continue;
            }
            MultiListNode *tail = node->child;
            while (tail->next != nullptr)
                tail = tail->next;
            tail->next = node->next;
            if (node->next != nullptr)
                node->next->prev = tail;
            node->next = node->child;
            node->child->prev = node;
            node->child = nullptr;
            node = node->next;
        }
        return head;
    }
};
