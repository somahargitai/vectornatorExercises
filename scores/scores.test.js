const getTotalGoals = require('./scores');
const axios = require('axios');

describe('getTotalGoals', () => {
  jest.mock('axios');

  beforeEach(() => {
    jest.resetAllMocks();
  })

  const page1 = {
    "page": 1,
    "per_page": 2,
    "total": 5,
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

  const page2 = {
    "page": 2,
    "per_page": 2,
    "total": 5,
    "total_pages": 3,
    "data": [
      {
        "competition": "Test League",
        "year": 1999,
        "round": "",
        "team1": "Jarvis",
        "team2": "Team17",
        "team1goals": "4",
        "team2goals": "3"
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

  const page3 = {
    "page": 3,
    "per_page": 2,
    "total": 5,
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
        "team1": "Jarvis",
        "team2": "Team17",
        "team1goals": "2",
        "team2goals": "4"
      }
    ]
  };

  const onePageResult = {
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
        "team2goals": "106"
      }
    ]
  };


  test('Team with three pages', async () => {
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({data: page1 }))
      .mockImplementationOnce(() => Promise.resolve({data: page2 }))
      .mockImplementationOnce(() => Promise.resolve({data: page3 }));
    
    const goals = await getTotalGoals('Team17', '1999');
    expect(goals).toEqual(21);
    expect(axios.get).toHaveBeenCalledTimes(3);
  });

  test('Same for the other team', async () => {
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({data: page1 }))
      .mockImplementationOnce(() => Promise.resolve({data: page2 }))
      .mockImplementationOnce(() => Promise.resolve({data: page3 }));
    
    const goals = await getTotalGoals('Jarvis', '1999');
    expect(goals).toEqual(17);
    expect(axios.get).toHaveBeenCalledTimes(3);
  });

  test('Team with one page', async () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({data: onePageResult}));
    
      const goals = await getTotalGoals('Jarvis', '1999');
      expect(goals).toEqual(108);
      expect(axios.get).toHaveBeenCalledTimes(1);
  });
  
  test('Team with empty result', async () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({data: {"page":1,"per_page":10,"total":0,"total_pages":0,"data":[]}}));

      const goals = await getTotalGoals('Jarvis', '1999');
      expect(goals).toEqual(0);
      expect(axios.get).toHaveBeenCalledTimes(1);
  });

});
