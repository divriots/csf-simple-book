import { NormalizedProjectAnnotations } from '@divriots/csf-helpers';
import { StoryFile } from './story-file';
import './story-file';

export class StoryBook extends HTMLElement {
  initStoryModules(
    modules: Record<string, () => Promise<any>>,
    projectAnnotations: NormalizedProjectAnnotations
  ) {
    for (const [file, importer] of Object.entries(modules)) {
      let el = this.querySelector(`story-file[file="${file}"]`) as StoryFile;
      if (!el) {
        el = document.createElement('story-file') as StoryFile;
        el.setAttribute('file', file);
        this.appendChild(el);
      }
      el.initFile(importer, projectAnnotations);
    }
  }

  connectedCallback() {}
}
