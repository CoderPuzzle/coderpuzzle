// Problem-provided driver for 2723 add-two-promises. Assembled into every
// submission by the judge ahead of the submitted code; never editable in
// the editor. This file is the hidden implementation — solvers see only
// the public API documented in the statement.
//
// The case's two promise specs become real promises on a deterministic
// virtual clock: each resolves with its value once its stated delay
// elapses, ticks fire in (due time, scheduling order), and drive() pumps
// them with a microtask checkpoint between fires so every settlement's
// full promise cascade drains before the next one fires. Real time and
// real timers have no influence on what is judged; only the resolved sum
// is.

type PairSpec = { value: number; delay: number };

class SumClock {
    private ticks: { time: number; sequence: number; callback: () => void }[] = [];
    private sequence = 0;

    schedule(delay: number, callback: () => void): void {
        const tick = {
            time: Math.max(0, delay),
            sequence: this.sequence++,
            callback,
        };
        const position = this.ticks.findIndex(
            (scheduled) =>
                scheduled.time > tick.time || (scheduled.time === tick.time && scheduled.sequence > tick.sequence),
        );
        if (position === -1) {
            this.ticks.push(tick);
        } else {
            this.ticks.splice(position, 0, tick);
        }
    }

    get size(): number {
        return this.ticks.length;
    }

    // Fire the earliest due tick; the driver interleaves these fires with
    // microtask checkpoints so settlement cascades fully drain between
    // them.
    fireNext(): void {
        this.ticks.shift()!.callback();
    }
}

class SumDriver {
    readonly promises: Promise<number>[];
    private resolved: number | null = null;
    private clock = new SumClock();

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (this case's two promise specs) plus the query
    // budget (unused here — the driver schedules a bounded number of ticks
    // by design). The budget stays untyped: the generic wrapper reads it
    // as an opaque value. Both inputs resolve by the problem's guarantee,
    // so no rejection paths exist to defend against.
    constructor([promise1, promise2]: any[], budget?: any) {
        void budget;
        this.promises = ([promise1, promise2] as PairSpec[]).map(
            (spec): Promise<number> =>
                new Promise<number>((resolve) => {
                    this.clock.schedule(spec.delay, () => resolve(spec.value));
                }),
        );
    }

    // Hand this case's promises to the submission's addTwoPromises, pump
    // every scheduled settlement in due-time order, then await the
    // returned promise itself. Each tick is followed by a microtask
    // checkpoint so settlement cascades drain as they happen; the final
    // await adopts whatever resolution hops remain (an async submission
    // chain can add several), and a returned promise that rejects or
    // resolves with a non-number surfaces as a clean runtime error.
    async drive(addTwoPromises: (a: Promise<number>, b: Promise<number>) => Promise<unknown>): Promise<void> {
        const returned = addTwoPromises(this.promises[0], this.promises[1]);
        if (!returned || typeof returned.then !== "function") {
            throw new Error("addTwoPromises must return a promise");
        }
        let fired = 0;
        while (this.clock.size > 0) {
            if (++fired > 100000) {
                throw new Error("Virtual tick cap exceeded");
            }
            this.clock.fireNext();
            await null;
        }
        await null;
        try {
            const sum = await returned;
            if (typeof sum !== "number" || !Number.isFinite(sum)) {
                throw new Error("Returned promise must resolve with a number");
            }
            this.resolved = sum;
        } catch (problem) {
            throw new Error(
                "Returned promise rejected: " + (problem instanceof Error ? problem.message : String(problem)),
            );
        }
    }

    verdict(): number {
        if (this.resolved === null) {
            throw new Error("Returned promise never resolved");
        }
        return this.resolved;
    }
}
