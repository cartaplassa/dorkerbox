export const getURL = () => {
  const url = new URL(window.location.origin).hostname;
  return url;
};

export const engines = {
  'duckduckgo.com': 'ddg',
  'lite.duckduckgo.com': 'ddg-lite',
  'html.duckduckgo.com': 'ddg-html',
  'www.google.com': 'google',
  // TODO fill this crap, move it where appropriate
};
export const getSE = () => engines[getURL()];
