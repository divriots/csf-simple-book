import css from './story-card.css?raw';

const template = document.createElement('template');
template.innerHTML = /*html*/ `
<div class="story-frame">
  <slot name="root">loading</slot>
</div>
<div class="story-label">story</div>
`;
const sheet = new CSSStyleSheet();
sheet.replaceSync(css);

export class FullScreenEvent extends Event {
  constructor(public fullScreen: boolean) {
    super('full-screen', {});
  }
}

export class StoryCard extends HTMLElement {
  render: () => Promise<void | (() => void)>;
  visible = false;
  disp: void | (() => void);

  async maybeRender(force = false) {
    if (this.disp) {
      if (!force) return;
      this.disp();
      this.disp = undefined;
    }
    if (this.visible && this.render) {
      const path = new URLSearchParams(window.location.search).get('path');
      if (path && path !== this.getAttribute('path')) return;
      try {
        this.disp = await this.render();
      } catch (e) {
        this.onError(e);
      }
    }
  }

  async rerender(cb) {
    this.render = cb;
    await this.maybeRender(true);
  }

  onError(e) {
    console.error(e);
    this.classList.add('error');
  }

  async connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sheet];

    const checkState = () => {
      const currentlyFull = this.classList.contains('fullscreen');
      const path = new URLSearchParams(window.location.search).get('path');
      if (path === this.getAttribute('path')) {
        if (currentlyFull) return;
        this.classList.add('fullscreen');
      } else {
        if (!currentlyFull) return;
        this.classList.remove('fullscreen');
      }
      this.dispatchEvent(new FullScreenEvent(!currentlyFull));
    };
    window.addEventListener('popstate', checkState);
    checkState();
    const content = template.content.cloneNode(true);
    if (this.getAttribute('fullscreen') === 'true')
      this.classList.toggle('fullscreen');
    this.shadowRoot.appendChild(content);
    const label = this.shadowRoot.querySelector(
      '.story-label'
    ) as HTMLDivElement;
    label.textContent = this.getAttribute('label') || 'story';
    label.onclick = () => {
      this.classList.toggle('fullscreen');
      window.history.pushState(
        {},
        '',
        this.classList.contains('fullscreen')
          ? `${window.location.origin}?path=${this.getAttribute('path')}`
          : window.location.origin
      );
      this.dispatchEvent(
        new FullScreenEvent(this.classList.contains('fullscreen'))
      );
    };
    let io = new IntersectionObserver(async (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.disconnect();
        this.visible = true;
        this.maybeRender(true);
        break;
      }
    });

    io.observe(this);
  }
}

try {
  customElements.define('story-card', StoryCard);
} catch (e) {}
