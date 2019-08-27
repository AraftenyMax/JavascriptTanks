class Renderer {
    constructor(renderProvider) {
        this.renderProvider = renderProvider;
    }

    render(obj) {
        this.renderProvider.render(obj);
    }
}

export default Renderer;