module.exports = class Link {
    // the pegCount is for the target, not sure why i need this. maybe for the layout
    constructor(parentId, childId, move, pegCount) {
        this.source = parentId;
        this.target = childId;
        this.move = move;
        this.pegCount = pegCount;
    }
}