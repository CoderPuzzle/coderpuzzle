import java.util.concurrent.Semaphore;

class FooBar {

    // One permit starts on foo's side, so the alternation opens with "foo";
    // each print hands the single permit to the other method.
    private final int n;
    private final Semaphore fooPermit = new Semaphore(1);
    private final Semaphore barPermit = new Semaphore(0);

    public FooBar(int n) {
        this.n = n;
    }

    public void foo(Runnable printFoo) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            fooPermit.acquire();
            printFoo.run();
            barPermit.release();
        }
    }

    public void bar(Runnable printBar) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            barPermit.acquire();
            printBar.run();
            fooPermit.release();
        }
    }
}
