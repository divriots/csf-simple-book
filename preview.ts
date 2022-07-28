import { getStoryStore } from '@divriots/csf-helpers';

const storyModules = import.meta.glob('./**/*.stories.ts');
const storyStore = getStoryStore();
storyStore.setProjectAnnotations({})
storyStore.loadModules(storyModules)
