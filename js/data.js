const levels = [
  {
    levelType: `two-cards`,
    levelNumber: `level-1`,
    levelOrder: 1,
    cards: [
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        rightAnswer: `paint`
      },
      {
        cardContent: `https://k32.kn3.net/5C7060EC5.jpg`,
        rightAnswer: `paint`
      }
    ]
  },
  {
    levelType: `one-card`,
    levelNumber: `level-2`,
    levelOrder: 2,
    cards: [
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        rightAnswer: `paint`
      }
    ]
  },
  {
    levelType: `three-cards`,
    levelNumber: `level-3`,
    levelOrder: 3,
    cards: [
      {
        cardContent: `https://i.imgur.com/DiHM5Zb.jpg`,
        rightAnswer: `photo`
      },
      {
        cardContent: `https://k32.kn3.net/5C7060EC5.jpg`,
        rightAnswer: `paint`
      },
      {
        cardContent: `http://i.imgur.com/1KegWPz.jpg`,
        rightAnswer: `photo`
      }
    ]
  },
  {
    levelType: `two-cards`,
    levelNumber: `level-4`,
    levelOrder: 4,
    cards: [
      {
        cardContent: `https://k32.kn3.net/5C7060EC5.jpg`,
        rightAnswer: `paint`
      },
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        rightAnswer: `paint`
      }
    ]
  },
  {
    levelType: `one-card`,
    levelNumber: `level-5`,
    levelOrder: 5,
    cards: [
      {
        cardContent: `https://k32.kn3.net/5C7060EC5.jpg`,
        rightAnswer: `paint`
      }
    ]
  },
  {
    levelType: `three-cards`,
    levelNumber: `level-6`,
    levelOrder: 6,
    cards: [
      {
        cardContent: `http://i.imgur.com/DKR1HtB.jpg`,
        rightAnswer: `photo`
      },
      {
        cardContent: `http://i.imgur.com/1KegWPz.jpg`,
        rightAnswer: `photo`
      },
      {
        cardContent: `https://k42.kn3.net/CF42609C8.jpg`,
        rightAnswer: `paint`
      }
    ]
  },
  {
    levelType: `two-cards`,
    levelNumber: `level-7`,
    levelOrder: 7,
    cards: [
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        rightAnswer: `paint`
      },
      {
        cardContent: `https://k42.kn3.net/CF42609C8.jpg`,
        rightAnswer: `paint`
      }
    ]
  },
  {
    levelType: `one-card`,
    levelNumber: `level-8`,
    levelOrder: 8,
    cards: [
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        rightAnswer: `paint`
      }
    ]
  },
  {
    levelType: `three-cards`,
    levelNumber: `level-9`,
    levelOrder: 9,
    cards: [
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        rightAnswer: `paint`
      },
      {
        cardContent: `https://i.imgur.com/DiHM5Zb.jpg`,
        rightAnswer: `photo`
      },
      {
        cardContent: `http://i.imgur.com/DKR1HtB.jpg`,
        rightAnswer: `photo`
      }
    ]
  },
  {
    levelType: `two-cards`,
    levelNumber: `level-10`,
    levelOrder: 10,
    cards: [
      {
        cardContent: `https://k42.kn3.net/CF42609C8.jpg`,
        rightAnswer: `paint`
      },
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        rightAnswer: `paint`
      }
    ]
  }
];

const initialState = {
  level: 1,
  levelNumbers: 10,
  lives: 3,
  time: 30
};

let userState = {
  time: 30,
  lives: 3
};

let answers = [];

export {initialState, levels, answers, userState};
