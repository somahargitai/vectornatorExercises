const getTotalGoals = require('./scores');
const axios = require('axios');

describe('getTotalGoals', () => {
  jest.mock('axios');

  beforeEach(() => {
    jest.resetAllMocks();
  })

  test('Team with three pages', async () => {  
    const homeMatchesPage1 = {
    "page": 1,
    "per_page": 2,
    "total": 6,
    "total_pages": 3,
    "data": [
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Team17",
        "team2": "Jarvis",
        "team1goals": "3",
        "team2goals": "2"
      },
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Team17",
        "team2": "Jarvis",
        "team1goals": "1",
        "team2goals": "6"
      }
    ]
  };

  const homeMatchesPage2 = {
    "page": 2,
    "per_page": 2,
    "total": 6,
    "total_pages": 3,
    "data": [
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Team17",
        "team2": "Jarvis",
        "team1goals": "3",
        "team2goals": "4"
      },
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Team17",
        "team2": "Jarvis",
        "team1goals": "9",
        "team2goals": "2"
      }
    ]
  };

  const homeMatchesPage3 = {
    "page": 3,
    "per_page": 2,
    "total": 6,
    "total_pages": 3,
    "data": [
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Team17",
        "team2": "Jarvis",
        "team1goals": "1",
        "team2goals": "1"
      },
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Team17",
        "team2": "Jarvis",
        "team1goals": "4",
        "team2goals": "2"
      }
    ]
  };

  const guestMatchesPage1 = {
    "page": 1,
    "per_page": 2,
    "total": 4,
    "total_pages": 2,
    "data": [
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Jarvis",
        "team2": "Team17",
        "team1goals": "1",
        "team2goals": "2"
      },
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Jarvis",
        "team2": "Team17",
        "team1goals": "1",
        "team2goals": "6"
      }
    ]
  };

  const guestMatchesPage2 = {
    "page": 2,
    "per_page": 2,
    "total": 4,
    "total_pages": 2,
    "data": [
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Jarvis",
        "team2": "Team17",
        "team1goals": "3",
        "team2goals": "2"
      },
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Jarvis",
        "team2": "Team17",
        "team1goals": "1",
        "team2goals": "6"
      }
    ]
  };

    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({data: homeMatchesPage1 }))
      .mockImplementationOnce(() => Promise.resolve({data: homeMatchesPage2 }))
      .mockImplementationOnce(() => Promise.resolve({data: homeMatchesPage3 }))
      .mockImplementationOnce(() => Promise.resolve({data: guestMatchesPage1 }))
      .mockImplementationOnce(() => Promise.resolve({data: guestMatchesPage2 }));
    
    const goals = await getTotalGoals('Team17', '1999');
    expect(goals).toEqual(37);
    expect(axios.get).toHaveBeenCalledTimes(5);
  });

  test('Same for the other team', async () => {
    const guestMatchesPage1 = {
      "page": 1,
      "per_page": 2,
      "total": 6,
      "total_pages": 3,
      "data": [
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Team17",
          "team2": "Jarvis",
          "team1goals": "3",
          "team2goals": "2"
        },
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Team17",
          "team2": "Jarvis",
          "team1goals": "1",
          "team2goals": "6"
        }
      ]
    };
  
    const guestMatchesPage2 = {
      "page": 2,
      "per_page": 2,
      "total": 6,
      "total_pages": 3,
      "data": [
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Team17",
          "team2": "Jarvis",
          "team1goals": "3",
          "team2goals": "4"
        },
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Team17",
          "team2": "Jarvis",
          "team1goals": "9",
          "team2goals": "2"
        }
      ]
    };
  
    const guestMatchesPage3 = {
      "page": 3,
      "per_page": 2,
      "total": 6,
      "total_pages": 3,
      "data": [
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Team17",
          "team2": "Jarvis",
          "team1goals": "1",
          "team2goals": "1"
        },
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Team17",
          "team2": "Jarvis",
          "team1goals": "4",
          "team2goals": "2"
        }
      ]
    };
  
    const homeMatchesPage1 = {
      "page": 1,
      "per_page": 2,
      "total": 4,
      "total_pages": 2,
      "data": [
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Jarvis",
          "team2": "Team17",
          "team1goals": "1",
          "team2goals": "2"
        },
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Jarvis",
          "team2": "Team17",
          "team1goals": "1",
          "team2goals": "6"
        }
      ]
    };
  
    const homeMatchesPage2 = {
      "page": 2,
      "per_page": 2,
      "total": 4,
      "total_pages": 2,
      "data": [
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Jarvis",
          "team2": "Team17",
          "team1goals": "3",
          "team2goals": "2"
        },
        {
          "competition": "Test League",
          "year": 1999,
          "round": "",
          "team1": "Jarvis",
          "team2": "Team17",
          "team1goals": "1",
          "team2goals": "6"
        }
      ]
    };

    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({data: homeMatchesPage1 }))
      .mockImplementationOnce(() => Promise.resolve({data: homeMatchesPage2 }))
      .mockImplementationOnce(() => Promise.resolve({data: guestMatchesPage1 }))
      .mockImplementationOnce(() => Promise.resolve({data: guestMatchesPage2 }))
      .mockImplementationOnce(() => Promise.resolve({data: guestMatchesPage3 }));
    
    const goals = await getTotalGoals('Jarvis', '1999');
    expect(goals).toEqual(23);
    expect(axios.get).toHaveBeenCalledTimes(5);
  });

  test('Team with one page', async () => {
    
  const homeMatches_onePager = {
    "page": 1,
    "per_page": 2,
    "total": 2,
    "total_pages": 1,
    "data": [
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Jarvis",
        "team2": "Team17",
        "team1goals": "3",
        "team2goals": "2"
      },
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Jarvis",
        "team2": "Team17",
        "team1goals": "1",
        "team2goals": "106"
      }
    ]
  };

  const guestMatches_onePager = {
    "page": 1,
    "per_page": 2,
    "total": 2,
    "total_pages": 1,
    "data": [
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Team17",
        "team2": "Jarvis",
        "team1goals": "5",
        "team2goals": "6",
      },
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Team17",
        "team2": "Jarvis",
        "team1goals": "4",
        "team2goals": "100",
      }
    ]
  };

    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({data: homeMatches_onePager }))
      .mockImplementationOnce(() => Promise.resolve({data: guestMatches_onePager }));
    
      const goals = await getTotalGoals('Jarvis', '1999');
      expect(goals).toEqual(110);
      expect(axios.get).toHaveBeenCalledTimes(2);
  });
  
  test('Team with empty result', async () => {
    axios.get = jest
      .fn()      
      .mockImplementationOnce(() => Promise.resolve({data: {"page":1,"per_page":10,"total":0,"total_pages":0,"data": [] }}))
      .mockImplementationOnce(() => Promise.resolve({data: {"page":1,"per_page":10,"total":0,"total_pages":0,"data": [] }}));

      const goals = await getTotalGoals('Jarvis', '1999');
      expect(goals).toEqual(0);
      expect(axios.get).toHaveBeenCalledTimes(2);
  });

});
