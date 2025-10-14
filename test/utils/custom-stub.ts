type StubMethodStructure = {
  name: string,
  of: () => any 
};

type StubStructure = {
  ref: any,
  methods: StubMethodStructure[]
};

class CustomStub {
  private readonly stubStrucures: StubStructure[] = [];

  stubMethod(ref: any, method: string, cb: (args: any) => any) {
    if (typeof ref[method] !== 'function') throw new TypeError(`${method} is not a function`);
    let foundStructure: StubStructure | undefined = this.stubStrucures.find((ss: StubStructure) => ss.ref === ss);
    if (!foundStructure) {
      foundStructure = { ref, methods: [] };
      this.stubStrucures.push(foundStructure);
    }
    const foundMethodStructure: StubMethodStructure | undefined = foundStructure.methods.find((sms: StubMethodStructure) => sms.name === method);
    if (!foundMethodStructure) foundStructure.methods.push({name: method, of: ref[method]});

    ref[method] = cb;
  }

  restore(ref: any) {
    this.restoreOriginalsByObjectReference(ref, true);
  }

  restoreAll() {
    this.stubStrucures.forEach((ss: StubStructure) => this.restoreOriginalsByObjectReference(ss.ref, false));
    this.emptyArray();
  }

  private restoreOriginalsByObjectReference(ref: any, shouldRemoveElement: boolean) {
    const foundStructure = this.stubStrucures.find((ss: StubStructure) => ss.ref === ref);
    if (!foundStructure) return;
    foundStructure.methods.forEach((sms: StubMethodStructure) => foundStructure.ref[sms.name] = sms.of);
    if (!shouldRemoveElement) return;
    const foundIndex = this.stubStrucures.findIndex((ss: StubStructure) => ss.ref === ref);
    if (foundIndex === -1) return;
    this.stubStrucures.splice(foundIndex, 1);
  }

  private emptyArray() {
    while (this.stubStrucures.length) this.stubStrucures.splice(0, 1);
  }
};

export default new CustomStub();