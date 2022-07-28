import { getStoryStore, NormalizedProjectAnnotations, StoryStore } from '@divriots/csf-helpers';
import { StoryFile } from './story-file';

export class StoryBook extends HTMLElement {
  storyStore: StoryStore;
  disp?: () => void;

  constructor() {
    super();
    this.storyStore = getStoryStore();
  }

  connectedCallback() {
    this.disp = this.storyStore.on('story-file', e => {
      this.addStoryFile(e.file, e.importer, e.projectAnnotations);
    })
    const storyFiles = this.storyStore.getStoryFiles();
    const projectAnnotations = this.storyStore.projectAnnotations;
    for (const [file, importer] of Object.entries(storyFiles)) {
      this.addStoryFile(file, importer, projectAnnotations);
    }
  }

  disconnectedCallback() {
    if (this.disp) {
      this.disp();
      this.disp = undefined;
    }
  }

  addStoryFile(file: string, importer: () => Promise<any>, projectAnnotations: NormalizedProjectAnnotations) {
    let el = this.querySelector(`story-file[file="${file}"]`) as StoryFile;
    if (!el) {
      el = document.createElement('story-file') as StoryFile;
      el.setAttribute('file', file);
      this.appendChild(el);
    }
    el.initFile(importer, projectAnnotations);
  }
}
