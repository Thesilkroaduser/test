const inputArea = document.querySelector('.input');
const addButton = document.querySelector('.add');
const tagContainer = document.querySelector('.items');
const readonlyButton = document.querySelector('.readonly');

let tags = {
  get сontent() {
    return this.content;
  },
  set сontent(value) {
    this.content = value;
  }
}

let readOnlyMode = false;

const createTag = (content) => {
  const tag = document.createElement('div');
  const deleteTag = document.createElement('button');
  deleteTag.className = 'delete';
  tag.className = 'tag';
  tag.textContent = content;
  tag.append(deleteTag);
  tagContainer.prepend(tag);
}

if (localStorage.getItem('tagsContent')) {
  tags.content = JSON.parse(localStorage.getItem('tagsContent'));
  for (let i = 0; i < tags.content.length; i += 1) {
    createTag(tags.content[i]);
  }
} else {
  tags.content = [];
}

console.log(tags.content);

window.addEventListener('click', (e) => {
  if (e.target.className === 'delete' && !readOnlyMode) {
    const key = e.target.parentNode.textContent;
    console.log(key);
    tags.content.splice(tags.content.indexOf(key), 1);
    localStorage.setItem('tagsContent', JSON.stringify(tags.content));
    e.target.parentNode.remove();
  } else if (e.target.className === 'add' && !readOnlyMode) {
    tags.content.push(inputArea.value);
    createTag(inputArea.value);
    localStorage.setItem('tagsContent', JSON.stringify(tags.content));
  } else if (e.target.className.includes('readonly')) {
    readOnlyMode = !readOnlyMode;
    readonlyButton.classList.toggle('active');
  }
});
