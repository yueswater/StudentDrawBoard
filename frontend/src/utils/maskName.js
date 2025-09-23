export function maskName(fullName) {
  const match = fullName.match(/^([\u4e00-\u9fa5]+)(.*)$/);
  if (!match) return fullName;

  const chinese = match[1];
  const rest = match[2];

  const len = chinese.length;
  let maskedChinese = chinese;

  if (len === 2) {
    maskedChinese = chinese[0] + "*";
  } else if (len === 3) {
    maskedChinese = chinese[0] + "*" + chinese[2];
  } else if (len === 4) {
    maskedChinese = chinese[0] + "**" + chinese[3];
  }

  return maskedChinese + rest;
}