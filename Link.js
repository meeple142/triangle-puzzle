module.exports = class Link {
    // the pegCount is for the target, not sure why i need this. maybe for the layout
    constructor(parentId, childId, pegCount) {
        this.source = parentId;
        this.target = childId;
        this.pegCount = pegCount;
    }
}