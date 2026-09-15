class MyCircularQueue {
  public:
    MyCircularQueue(int k);
    bool enQueue(int value);
    bool deQueue();
    int Front();
    int Rear();
    bool isEmpty();
    bool isFull();
};
