class promStack {

    static queue = [];
    static queueIsRunning = false;
    static queueFactory;
    static onStart = () => { }
    static onFinish = () => { }

    static enqueue(f) {

        this.queue = [f, ...this.queue];
        if (!this.queueIsRunning) this._dq();
        return false;

    }

    static async _dq(p) {

        if (!this.queueIsRunning) {
            this.queueIsRunning = true;
            p = await this.onStart();
            this.queueFactory = this.dequeue();
        }

        if (this.queueFactory) {
            const nxt = this.queueFactory.next();
            return (nxt.value) ? nxt.value(p) : this.onFinish(p);
        }

        return () => { throw('trying to feed empty queueFactory'); };

    }

    static* dequeue() {
        var f;

        while (this.queue.length > 0) {
            f = this.queue.pop();
            yield (p) => new Promise(async (resolve, reject) => { 
                    await f(resolve, reject, p);
                })
                .then(r => this._dq(r))
                .catch(e => {
                    console.log('PS> error:', e);
                    this._dq(e);
                });
        }
        this.queueIsRunning = false;
        
        return false;

    }

}

module.exports = promStack;