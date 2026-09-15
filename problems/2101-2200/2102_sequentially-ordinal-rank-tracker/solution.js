class SORTracker {
    constructor() {
        this.prefix = [];
        this.remaining = [];
    }

    _push(target, location, comesFirst) {
        target.push(location);
        let index = target.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (!comesFirst(target[index], target[parent])) break;
            [target[index], target[parent]] = [target[parent], target[index]];
            index = parent;
        }
    }

    _pop(target, comesFirst) {
        const root = target[0];
        const last = target.pop();
        if (target.length > 0) {
            target[0] = last;
            let index = 0;
            while (true) {
                let first = index;
                const left = index * 2 + 1;
                const right = left + 1;
                if (left < target.length && comesFirst(target[left], target[first])) first = left;
                if (right < target.length && comesFirst(target[right], target[first])) first = right;
                if (first === index) break;
                [target[index], target[first]] = [target[first], target[index]];
                index = first;
            }
        }
        return root;
    }

    add(name, score) {
        const worstFirst = (left, right) =>
            left.score !== right.score ? left.score < right.score : left.name > right.name;
        const bestFirst = (left, right) =>
            left.score !== right.score ? left.score > right.score : left.name < right.name;
        this._push(this.prefix, { name, score }, worstFirst);
        this._push(this.remaining, this._pop(this.prefix, worstFirst), bestFirst);
    }

    get() {
        const worstFirst = (left, right) =>
            left.score !== right.score ? left.score < right.score : left.name > right.name;
        const bestFirst = (left, right) =>
            left.score !== right.score ? left.score > right.score : left.name < right.name;
        this._push(this.prefix, this._pop(this.remaining, bestFirst), worstFirst);
        return this.prefix[0].name;
    }
}
