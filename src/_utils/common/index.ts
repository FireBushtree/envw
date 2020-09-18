export const getUrlParam = (key: string) => {
  let paramObj = {} as any;
  let matchList = window.location.href.match(/([^\?&]+)=([^\?#&]+)/g) || [];
  for (let i = 0, len = matchList.length; i < len; i++) {
    let r = matchList[i].match(/([^\?&]+)=([^&]+)/);

    if (r) {
      paramObj[r[1]] = r[2];
    }
  }
  if (key) {
    return paramObj[key];
  } else {
    return paramObj;
  }
};