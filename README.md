# CSF Simple Book [![npm Version](https://img.shields.io/npm/v/@divriots/csf-simple-book?cacheSeconds=1800)](https://npmjs.com/package/divriots/csf-simple-book)

Simple (no dependency) story-book component to render CSF stories in any project, any framework.

## Install

```sh
pnpm add @divriots/csf-simple-book @divriots/csf-helpers -D
```

## Example use

```html
<body>
	<story-book></story-book>
</body>
```

```js
import { getStoryStore } from '@divriots/csf-helpers';
import '@divriots/csf-simple-book';

// fetch all stories to include in the book (vite format: https://vitejs.dev/guide/features.html#glob-import )
const storyModules = import.meta.glob('./**/*.stories.js');

// get the global story store singleton
const storyStore = getStoryStore();

// project annotations to apply to all stories (e.g. render, renderToDOM, globals, parameters ...)
storyStore.setProjectAnnotations({
  parameters: {
    layout: 'centered',
  }
});

// loads story files into the store
storyStore.loadModules(storyModules)

// That's all
```

### Live demo

Open in [stackblitz](https://stackblitz.com/github/divriots/csf-simple-book) 


## Example use (react 18+)

```js
import * as reactConfig from '@divriots/csf-react-renderer';

...
storyStore.setProjectAnnotations({
  // will inject render & renderToDOM implementations for react
  ...reactConfig,
  parameters: {
    layout: 'centered',
  }
});
...

```

