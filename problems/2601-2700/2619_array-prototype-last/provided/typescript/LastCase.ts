// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   LastCase carries one case's array (.nums, the JSON.parse output the
//   statement speaks of). collect() is called by solve() AFTER the
//   submission has enhanced Array.prototype; it validates the enhancement
//   against fresh probe arrays of its own, so a submission that never
//   defined last (or faked it as an own property of the case array alone)
//   dies right here. verdict() is read after solve returns and reports
//   three probes — the case array itself, an untouched clone of it, and
//   an empty array — which is the judged transcript
//   ([liveLast, cloneLast, emptyLast]).
interface Array<T> {
    last(): T | -1;
}

type AnyArray = any[];

class LastCase {
    nums: AnyArray;
    private snapshot: AnyArray;

    constructor(values: any[], _queryBudget?: unknown) {
        const [nums] = values;
        if (!Array.isArray(nums)) {
            throw new Error("nums must be a JSON array");
        }
        this.nums = nums;
        // Pristine copy taken before any submission code runs, so a
        // solution that mutated or replaced the case array cannot fake
        // its way past the second probe.
        this.snapshot = JSON.parse(JSON.stringify(nums));
    }

    // The one sanctioned call from solve(); every check throws (a runtime
    // error) on a shape the statement forbids.
    collect(): void {
        const probes: [AnyArray, any][] = [
            [[7, 8, 9], 9],
            [[], -1],
            [["x"], "x"],
            [[null], null],
        ];
        for (const [probe, want] of probes) {
            if (typeof probe.last !== "function") {
                throw new Error("Array.prototype.last is not defined");
            }
            const got = probe.last();
            if (got !== want || typeof got !== typeof want) {
                throw new Error("enhancement must implement last() correctly on fresh arrays");
            }
        }
    }

    verdict(): AnyArray {
        return [this.nums.last(), this.snapshot.last(), ([] as AnyArray).last()];
    }
}
