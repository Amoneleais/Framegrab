export const windowsToLinuxPath = (path: string): string => {
  let linuxPath = path.replace(/\\/g, '/');
  if (linuxPath.match(/^[a-zA-Z]:\//)) {
    linuxPath = '/host-c/' + linuxPath.substring(3);
  }
  return linuxPath;
};
