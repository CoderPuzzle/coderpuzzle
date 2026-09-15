type Callback = (...args: any[]) => any;

// A Map from event name to the list of callbacks subscribed to it, in
// subscribe order, is the whole data structure: appending keeps the order
// emit must report, and the handle's closure captures both the list and
// the exact callback object, so unsubscribe removes precisely its own
// subscription — two subscribes of identical source text are distinct
// functions and both must fire.
class EventEmitter {
    private listeners = new Map<string, Callback[]>();

    subscribe(eventName: string, callback: Callback): { unsubscribe(): void } {
        let list = this.listeners.get(eventName);
        if (list === undefined) {
            list = [];
            this.listeners.set(eventName, list);
        }
        list.push(callback);
        return {
            unsubscribe: (): void => {
                const at = list.indexOf(callback);
                if (at !== -1) {
                    list.splice(at, 1);
                }
            },
        };
    }

    emit(eventName: string, args: any[] = []): any[] {
        const results: any[] = [];
        for (const callback of this.listeners.get(eventName) || []) {
            results.push(callback(...args));
        }
        return results;
    }
}

class Solution {
    run(emitterCase: EmitterCase): void {
        emitterCase.drive(EventEmitter);
    }
}
