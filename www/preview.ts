import {
  normalizeProjectAnnotations,
  setupGlobals,
} from '@divriots/csf-helpers';
import { StoryBook } from '../src';

const storyModules = import.meta.glob('../**/*.stories.ts');
const projectAnnotations = normalizeProjectAnnotations({});
setupGlobals(storyModules, projectAnnotations);

(document.getElementsByTagName('story-book')[0] as StoryBook).initStoryModules(
  storyModules,
  projectAnnotations
);
