// Problem-provided driver for 2694 event-emitter. Assembled into every
// submission by the judge ahead of the submitted code; never editable in
// the editor. This file is the hidden implementation — solvers see only
// the public API documented in the statement.
//
// The driver owns one case's actions/values script (the same shape as the
// statement's Input): drive() receives the submission's EventEmitter class,
// constructs it at the script's leading "EventEmitter" action, then replays
// subscribe / emit / unsubscribe rows against that one instance. Each
// callback is built from its function source, subscribe must hand back an
// object with an unsubscribe method, and emit must return an array — the
// driver throws (a runtime error) on any other shape. The judged verdict is
// the recorded transcript: [] for the construction, ["subscribed"] per
// subscribe, ["emitted", results] per emit with every callback return in
// subscribe order, and ["unsubscribed", index] per unsubscribe.

class EmitterCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (actions, values) plus the query budget (unused —
    // replaying a bounded script needs no call accounting).
    constructor([actions, values], budget) {
        void budget;
        this.actions = actions;
        this.values = values;
        this.outputs = [];
    }

    // Replay this case's script against the submission's EventEmitter
    // class, recording one transcript row per action.
    drive(emitterClass) {
        let emitter = null;
        const handles = [];
        for (let at = 0; at < this.actions.length; at++) {
            const action = this.actions[at];
            const args = this.values[at];
            if (action === "EventEmitter") {
                if (emitter !== null) {
                    throw new Error("the script constructs EventEmitter more than once");
                }
                emitter = new emitterClass();
                this.outputs.push([]);
            } else if (action === "subscribe") {
                if (emitter === null) {
                    throw new Error("the script must construct the EventEmitter first");
                }
                const [eventName, source] = args;
                const callback = new Function("return (" + source + ");")();
                const handle = emitter.subscribe(eventName, callback);
                if (handle === null || typeof handle !== "object" || typeof handle.unsubscribe !== "function") {
                    throw new Error("subscribe must return an object with an unsubscribe method");
                }
                handles.push(handle);
                this.outputs.push(["subscribed"]);
            } else if (action === "emit") {
                if (emitter === null) {
                    throw new Error("the script must construct the EventEmitter first");
                }
                const results = args.length > 1 ? emitter.emit(args[0], args[1]) : emitter.emit(args[0]);
                if (!Array.isArray(results)) {
                    throw new Error("emit must return an array of callback results");
                }
                this.outputs.push(["emitted", results]);
            } else if (action === "unsubscribe") {
                if (emitter === null) {
                    throw new Error("the script must construct the EventEmitter first");
                }
                const [index] = args;
                if (!(index in handles)) {
                    throw new Error("unsubscribe referenced an unknown subscription");
                }
                handles[index].unsubscribe();
                this.outputs.push(["unsubscribed", index]);
            } else {
                throw new Error("Unknown action: " + action);
            }
        }
    }

    verdict() {
        return this.outputs;
    }
}
