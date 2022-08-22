import {
  processCSFFile,
  prepareStory,
  NormalizedProjectAnnotations,
  renderStory,
} from '@divriots/csf-helpers';
import { FullScreenEvent, StoryCard } from './story-card';
import css from './story-file.css?raw';

const template = document.createElement('template');
template.innerHTML = /*html*/ `
<h1>
  <a class="anchor" aria-hidden="true" href="{hash}">🔗</a>
  {title}
</h1>
<div class="story-list">
  <slot name="story"></slot>
</div>
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(css);

export class StoryFile extends HTMLElement {
  content?: DocumentFragment;

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
      let firstInit = false;
      if (!this.content) {
        this.content = template.content.cloneNode(true) as DocumentFragment;
        firstInit = true;
      }
      this.id = meta.title;
      (this.content.children[0].children[0] as HTMLLinkElement).href = hash;
      (this.content.children[0].childNodes[2] as Node).nodeValue = meta.title;
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
        if (firstInit) {
          this.shadowRoot.appendChild(this.content);
        }
      }
    });
  }

  async connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }
}
