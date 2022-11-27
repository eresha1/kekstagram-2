const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const SHOW_BY_STEP = 5;
const END_WORD = [' комментария', ' комментариев'];

const getWordEnding = (number) => (number % 10 === 1 && number % 100 !== 11) ? END_WORD[0] : END_WORD[1];


const clearCommentsData = () => {
  commentsContainer.innerHTML = '';
};

const updateCommentCount = (renderedCommens, maxComments) => {
  socialCommentCount.innerHTML = '';
  const renderedNode = document.createTextNode(`${renderedCommens} из `);
  const commentsCount = document.createElement('span');
  commentsCount.classList.add('comments-count');
  commentsCount.textContent = maxComments;
  const commentsTextNode = document.createTextNode(getWordEnding(maxComments));
  socialCommentCount.appendChild(renderedNode);
  socialCommentCount.appendChild(commentsCount);
  socialCommentCount.appendChild(commentsTextNode);
};

const createComment = (comment) => {
  const {avatar, message, name} = comment;
  const commentElement = commentTemplate.cloneNode(true);
  const avatarPicture = commentElement.querySelector('.social__picture');
  avatarPicture.src = avatar;
  avatarPicture.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};


const createStartComments = (comments ) => {
  clearCommentsData();
  const renderedCommentCount = Math.min(comments.length, SHOW_BY_STEP);
  for (let i = 0; i < renderedCommentCount; i++) {
    commentsContainer.append(createComment(comments[i]));
  }
  if (renderedCommentCount <= comments.length) {
    commentsLoader.classList.add('hidden');
  }
  updateCommentCount(renderedCommentCount, comments.length);
};

const updateCommentLoaderBtn = (comments) => {
  if (comments.length === 0) {
    commentsLoader.classList.add('hidden');
  }

  if (comments.length > SHOW_BY_STEP) {
    let renderedCommentCount = SHOW_BY_STEP;

    commentsLoader.classList.remove('hidden');

    commentsLoader.addEventListener('click', (evt) => {
      evt.preventDefault();
      comments
        .slice(renderedCommentCount, renderedCommentCount + SHOW_BY_STEP)
        .forEach((comment) => {
          commentsContainer.append(createComment(comment));
        });

      renderedCommentCount += SHOW_BY_STEP;

      if (renderedCommentCount >= comments.length) {
        commentsLoader.classList.add('hidden');
        renderedCommentCount = comments.length;
      }

      updateCommentCount(renderedCommentCount, comments.length);
    });
  }
};

export {createStartComments, updateCommentLoaderBtn };
