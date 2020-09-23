export const getUrlParam = (key: string) => {
  const paramObj = {} as any;
  const matchList = window.location.href.match(/([^\?&]+)=([^\?#&]+)/g) || [];
  for (let i = 0, len = matchList.length; i < len; i++) {
    const r = matchList[i].match(/([^\?&]+)=([^&]+)/);

    if (r) {
      paramObj[r[1]] = r[2];
    }
  }
  if (key) {
    return paramObj[key];
  }
  return paramObj;
};
