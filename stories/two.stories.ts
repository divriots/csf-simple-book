export default {
  title: 'Samples',
  renderToDOM({ storyFn }, domElement) {
    domElement.innerHTML = storyFn()
  }
}

export const some_story = () => 42
export const another_story = () => 42