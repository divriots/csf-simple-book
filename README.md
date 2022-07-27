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
import { normalizeProjectAnnotations } from '@divriots/csf-helpers';
import '@divriots/csf-simple-book';
import { StoryBook } from '@divriots/csf-simple-book';

// fetch all stories to include in the book (vite format: https://vitejs.dev/guide/features.html#glob-import )
const storyModules = import.meta.glob('./**/*.stories.js');

// project annotations to apply to all stories (e.g. render, renderToDOM, globals, parameters ...)
const projectAnnotations = normalizeProjectAnnotations({
  parameters: {
    layout: 'centered',
  }
});

document.getElementsByTagName('story-book')[0].initStoryModules(
  storyModules,
  projectAnnotations
);

// That's all
```

### Live demo

Open in [stackblitz](https://stackblitz.com/github/divriots/csf-simple-book) 


## Example use (react 18+)

```js
import * as reactConfig from '@divriots/csf-react-renderer';

...
const projectAnnotations = normalizeProjectAnnotations({
  // will inject render & renderToDOM implementations for react
  ...reactConfig,
  parameters: {
    layout: 'centered',
  }
});
...

```

