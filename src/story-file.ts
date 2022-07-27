import {
  processCSFFile,
  prepareStory,
  NormalizedProjectAnnotations,
  renderStory,
} from '@divriots/csf-helpers';
import { FullScreenEvent, StoryCard } from './story-card';
import './story-card';
import css from './story-file.css?raw';

const template = document.createElement('template');
template.innerHTML = /*html*/ `
<a href="{hash}">🔗</a>
<span>{title}</span>
<div class="story-list">
  <slot name="story"></slot>
</div>
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(css);

export class StoryFile extends HTMLElement {
  initFile(
    importer: () => Promise<any>,
    projectAnnotations: NormalizedProjectAnnotations
  ) {
    importer().then((module) => {
      const { meta, stories } = processCSFFile(
        module,
        this.getAttribute('file')
      );
      const hash = `#${meta.title}`;
      const content = template.content.cloneNode(true) as DocumentFragment;
      this.id = meta.title;
      (content.children[0] as HTMLLinkElement).href = hash;
      (content.children[1] as HTMLSpanElement).textContent = meta.title;
      for (const story of stories) {
        const prepared = prepareStory(story, meta, projectAnnotations);
        const currentPath = `/story/${prepared.id}`;
        let el = this.querySelector(`story-card#${prepared.id}`) as StoryCard;
        if (!el) {
          el = document.createElement('story-card') as StoryCard;
          el.id = prepared.id;
          el.setAttribute('slot', 'story');
          el.setAttribute('label', prepared.name);
          el.setAttribute('path', currentPath);
          this.appendChild(el);
          el.addEventListener('full-screen', (e: FullScreenEvent) => {
            if (e.fullScreen) return;
            document.querySelectorAll('story-card').forEach((el: StoryCard) => {
              el.maybeRender();
            });
          });
        }
        const root = document.createElement('div');
        root.setAttribute('slot', 'root');
        el.appendChild(root);
        el.rerender(() =>
          renderStory(
            prepared,
            root,
            'story'
            // abortSignal,
            // queryArgs
          )
        );
      }
      this.shadowRoot.appendChild(content);
    });
  }

  async connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }
}

try {
  customElements.define('story-file', StoryFile);
} catch (e) {}
