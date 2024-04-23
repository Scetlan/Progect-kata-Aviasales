function getTime(str, duration) {
  const start = new Date(str);
  const last = new Date(start);

  last.setMinutes(start.getMinutes() + duration);

  const options = { hour: 'numeric', minute: 'numeric' };

  return `
    ${start.toLocaleTimeString('ru-RU', options)} 
    -
    ${last.toLocaleTimeString('ru-RU', options)}
    `;
}

export { getTime };
