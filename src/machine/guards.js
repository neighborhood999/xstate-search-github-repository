export const checkHaveKeyword = ctx => {
  if (ctx.keyword === '') {
    return false;
  }

  return true;
};
