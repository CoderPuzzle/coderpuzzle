import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;
import java.util.function.IntConsumer;
import java.util.function.IntPredicate;

class FizzBuzz {

    private final int n;
    private int position = 1;
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition advanced = lock.newCondition();

    public FizzBuzz(int n) {
        this.n = n;
    }

    // Emit position's token when this thread's predicate matches; false once
    // the series is complete.
    private boolean step(IntPredicate matches, IntConsumer emit) throws InterruptedException {
        lock.lock();
        try {
            while (true) {
                if (position > n) {
                    advanced.signalAll();
                    return false;
                }
                if (matches.test(position)) {
                    emit.accept(position);
                    ++position;
                    advanced.signalAll();
                    return true;
                }
                advanced.await();
            }
        } finally {
            lock.unlock();
        }
    }

    public void fizz(Runnable printFizz) throws InterruptedException {
        while (step(v -> v % 3 == 0 && v % 5 != 0, value -> printFizz.run())) {}
    }

    public void buzz(Runnable printBuzz) throws InterruptedException {
        while (step(v -> v % 5 == 0 && v % 3 != 0, value -> printBuzz.run())) {}
    }

    public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {
        while (step(v -> v % 15 == 0, value -> printFizzBuzz.run())) {}
    }

    public void number(IntConsumer printNumber) throws InterruptedException {
        while (step(v -> v % 3 != 0 && v % 5 != 0, printNumber)) {}
    }
}
