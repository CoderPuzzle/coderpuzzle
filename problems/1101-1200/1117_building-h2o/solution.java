import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.Semaphore;

class H2O {

    // Two permits for hydrogen and one for oxygen cap what may be inside the
    // current molecule; the three-way barrier holds those threads together
    // until all of them have emitted, so no permit is returned early.
    private final Semaphore hydrogenSlots = new Semaphore(2);
    private final Semaphore oxygenSlots = new Semaphore(1);
    private final CyclicBarrier molecule = new CyclicBarrier(3);

    public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {
        hydrogenSlots.acquire();
        releaseHydrogen.run();
        bond();
        hydrogenSlots.release();
    }

    public void oxygen(Runnable releaseOxygen) throws InterruptedException {
        oxygenSlots.acquire();
        releaseOxygen.run();
        bond();
        oxygenSlots.release();
    }

    private void bond() throws InterruptedException {
        try {
            molecule.await();
        } catch (BrokenBarrierException error) {
            throw new InterruptedException("molecule barrier broken");
        }
    }
}
