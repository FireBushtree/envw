export const getUrlParam = (key: string) => {
  const paramObj = {} as any;
  const matchList = window.location.href.match(/([^?&]+)=([^?#&]+)/g) || [];
  for (let i = 0, len = matchList.length; i < len; i += 1) {
    const r = matchList[i].match(/([^?&]+)=([^&]+)/);

    if (r) {
      const [k, value] = r;
      paramObj[k] = value;
    }
  }
  if (key) {
    return paramObj[key];
  }
  return paramObj;
};
