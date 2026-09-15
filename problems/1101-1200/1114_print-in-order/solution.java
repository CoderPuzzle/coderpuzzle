import java.util.concurrent.CountDownLatch;

class Foo {

    // One one-shot gate per happens-before edge: second waits for the gate
    // first opens, third waits for the gate second opens.
    private final CountDownLatch secondGate = new CountDownLatch(1);
    private final CountDownLatch thirdGate = new CountDownLatch(1);

    public void first(Runnable printFirst) throws InterruptedException {
        printFirst.run();
        // Emit before opening the gate, so second can never overtake.
        secondGate.countDown();
    }

    public void second(Runnable printSecond) throws InterruptedException {
        secondGate.await();
        printSecond.run();
        thirdGate.countDown();
    }

    public void third(Runnable printThird) throws InterruptedException {
        thirdGate.await();
        printThird.run();
    }
}
