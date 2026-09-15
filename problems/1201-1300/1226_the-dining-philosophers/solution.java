import java.util.concurrent.Semaphore;

class DiningPhilosophers {

    // One permit per fork; even philosophers grab the left fork first and
    // odd ones the right, so the circular wait-chain of everyone grabbing
    // the same side first cannot form.
    private final Semaphore[] forks = new Semaphore[5];

    public DiningPhilosophers() {
        for (int index = 0; index < 5; ++index) {
            forks[index] = new Semaphore(1);
        }
    }

    public void wantsToEat(
        int philosopher,
        Runnable pickLeftFork,
        Runnable pickRightFork,
        Runnable eat,
        Runnable putLeftFork,
        Runnable putRightFork
    ) throws InterruptedException {
        Semaphore left = forks[philosopher];
        Semaphore right = forks[(philosopher + 1) % 5];
        Semaphore first = philosopher % 2 == 0 ? left : right;
        Semaphore second = philosopher % 2 == 0 ? right : left;
        first.acquire();
        second.acquire();
        pickLeftFork.run();
        pickRightFork.run();
        eat.run();
        putLeftFork.run();
        putRightFork.run();
        second.release();
        first.release();
    }
}
