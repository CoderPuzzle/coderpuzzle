class MyCircularDeque {
  public:
    MyCircularDeque(int k);
    bool insertFront(int value);
    bool insertLast(int value);
    bool deleteFront();
    bool deleteLast();
    int getFront();
    int getRear();
    bool isEmpty();
    bool isFull();
};
