class FrontMiddleBackQueue {
  public:
    FrontMiddleBackQueue();
    void pushFront(int val);
    void pushMiddle(int val);
    void pushBack(int val);
    int popFront();
    int popMiddle();
    int popBack();
};
