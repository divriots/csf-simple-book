import {StoryBook} from './story-book'
import {StoryCard} from './story-card'
import {StoryFile} from './story-file'

customElements.define('story-book', StoryBook);
customElements.define('story-file', StoryFile);
customElements.define('story-card', StoryCard);

export {StoryBook, StoryCard, StoryFile};