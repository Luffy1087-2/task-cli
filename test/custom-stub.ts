type Stub = {
    o: any,
    methods: { name: string, of: () => any }[]
}

class CustomStub {
    private readonly originalMethods: Stub[] = [];

    stubMethod(obj: any, method: string, cb: (args: any) => any) {
        if (typeof obj[method] !== 'function') throw new TypeError(`${method} is not a function`);
        let foundObject = this.originalMethods.find(curObj => curObj.o === curObj);
        if (!foundObject) {
            foundObject = {o: obj, methods: []};
            this.originalMethods.push(foundObject);
        }
        const foundMethod = foundObject.methods.find(m => m.name === method);
        if (!foundMethod) foundObject.methods.push({name: method, of: obj[method]});

        obj[method] = cb;
    }

    restore(obj: any) {
        const foundObject = this.originalMethods.find(curObj => curObj.o === obj);
        if (!foundObject) return;
        foundObject.methods.forEach(m => foundObject.o[m.name] = m.of);
    }

    restoreAll() {
        this.originalMethods.forEach((curObj: Stub) => this.restore(curObj.o));
    }
};

export default new CustomStub();