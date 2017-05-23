export const OPEN_MARKDOWN_PREVIEW = 'OPEN_MARKDOWN_PREVIEW';
export const CLOSE_MARKDOWN_PREVIEW = 'CLOSE_MARKDOWN_PREVIEW';

export const openMarkdownPreview = (text, path) => ({
  type: OPEN_MARKDOWN_PREVIEW,
  text,
  path,
});

export const closeMarkdownPreview = () => ({
  type: CLOSE_MARKDOWN_PREVIEW,
});

