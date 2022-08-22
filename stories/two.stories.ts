export default {
  title: 'Samples Two',
  renderToDOM({ storyFn }, domElement) {
    domElement.innerHTML = storyFn()
  }
}

export const some_story = () => 42
export const another_story = () => 42