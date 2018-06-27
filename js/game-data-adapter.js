const preprocessAnswers = (answer) => {
  if (answer === `painting`) {
    return `paint`;
  } else {
    return `photo`;
  }
};

const adaptServerData = (data) => {
  for (const level of Object.values(data)) {
    for (let answer of level.answers) {
      answer.type = preprocessAnswers(answer.type);
    }
  }
  return data;
};

export default adaptServerData;
