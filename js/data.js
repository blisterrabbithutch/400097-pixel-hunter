
//const levels = [
//  {
//    levelType: `one-card`,
//    levelNumber: 1,
//    cards: [
//      {
//        cardContent: `http://placehold.it/468x458`,
//        answers: [
//          { title: `photo`, isCorrect: true},
//          { title: `paint`, isCorrect: false}
//        ]
//      }
//    ]
//  },
//  {
//    levelType: `two-cards`,
//    levelNumber: 2,
//    cards: [
//      {
//        cardContent: `http://placehold.it/468x458`,
//        answers: [
//          { title: `photo`, isCorrect: true},
//          { title: `paint`, isCorrect: false}
//        ]
//      },
//      {
//        cardContent: `http://placehold.it/468x458`,
//        answers: [
//          { title: `photo`, isCorrect: true},
//          { title: `paint`, isCorrect: false}
//        ]
//      }
//    ]
//  },
//  {
//    levelType: `three-cards`,
//    levelNumber: 3,
//    cards: [
//      {
//        cardContent: `http://placehold.it/468x458`,
//        answers: [
//          { title: `photo`, isCorrect: true},
//          { title: `paint`, isCorrect: false}
//        ]
//      },
//      {
//        cardContent: `http://placehold.it/468x458`,
//        answers: [
//          { title: `photo`, isCorrect: true},
//          { title: `paint`, isCorrect: false}
//        ]
//      },
//      {
//        cardContent: `http://placehold.it/468x458`,
//        answers: [
//          { title: `photo`, isCorrect: true},
//          { title: `paint`, isCorrect: false}
//        ]
//      }
//    ]
//  }
//];

const levels = [
  {
    levelType: `two-cards`,
    levelNumber: `level-1`,
    levelOrder: 1,
    cards: [
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        answers: {
          'photo': false,
          'paint': true
        }
      },
      {
        cardContent: `https://k32.kn3.net/5C7060EC5.jpg`,
        answers: {
          'photo': false,
          'paint': true
        }
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
        answers: {
          'photo': false,
          'paint': true
        }
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
        answers: {
          'photo': true,
          'paint': false
        }
      },
      {
        cardContent: `https://k32.kn3.net/5C7060EC5.jpg`,
        answers: {
          'photo': false,
          'paint': true
        }
      },
      {
        cardContent: `http://i.imgur.com/1KegWPz.jpg`,
        answers: {
          'photo': true,
          'paint': false
        }
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
        answers: {
          'photo': false,
          'paint': true
        }
      },
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        answers: {
          'photo': false,
          'paint': true
        }
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
        answers: {
          'photo': false,
          'paint': true
        }
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
        answers: {
          'photo': true,
          'paint': false
        }
      },
      {
        cardContent: `http://i.imgur.com/1KegWPz.jpg`,
        answers: {
          'photo': true,
          'paint': false
        }
      },
      {
        cardContent: `https://k42.kn3.net/CF42609C8.jpg`,
        answers: {
          'photo': false,
          'paint': true
        }
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
        answers: {
          'photo': false,
          'paint': true
        }
      },
      {
        cardContent: `https://k42.kn3.net/CF42609C8.jpg`,
        answers: {
          'photo': false,
          'paint': true
        }
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
        answers: {
          'photo': false,
          'paint': true
        }
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
        answers: {
          'photo': false,
          'paint': true
        }
      },
      {
        cardContent: `https://i.imgur.com/DiHM5Zb.jpg`,
        answers: {
          'photo': true,
          'paint': false
        }
      },
      {
        cardContent: `http://i.imgur.com/DKR1HtB.jpg`,
        answers: {
          'photo': true,
          'paint': false
        }
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
        answers: {
          'photo': false,
          'paint': true
        }
      },
      {
        cardContent: `https://k42.kn3.net/D2F0370D6.jpg`,
        answers: {
          'photo': false,
          'paint': true
        }
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

//let answers = [
//  {
//    solved: false,
//    time: 5000
//  },
//  {
//    solved: true,
//    time: 22000
//  },
//  {
//    solved: true,
//    time: 7000
//  },
//  {
//    solved: true,
//    time: 15000
//  },
//  {
//    solved: true,
//    time: 12000
//  },
//  {
//    solved: true,
//    time: 17000
//  },
//  {
//    solved: true,
//    time: 26000
//  },
//  {
//    solved: true,
//    time: 12000
//  },
//  {
//    solved: true,
//    time: 7000
//  },
//  {
//    solved: true,
//    time: 11000
//  }
//];

let answers = [];

//let state = {
//  questions: [],
//  answers: []
//};

export {initialState, levels, answers, userState};
