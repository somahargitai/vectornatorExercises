const axios = require('axios');

const countGoalsforTeam = async (team, url) => {
  total = 0;
  for (let page = 1, lastPage = false; !lastPage; page++) {
    try {
      const pageData = await axios.get(`${url}&page=${page}`);

      pageData.data.data.forEach(
        (matchItem) =>
          (total += parseInt(
            matchItem.team1 === team
              ? matchItem.team1goals
              : matchItem.team2goals,
          )),
      );

      if (pageData.data.total_pages <= page) {
        lastPage = true;
      }
    } catch (error) {
      const errorMessage = `Error happened on getting hackerrank data for url: ${url}`;
      console.log(errorMessage);
      console.log(error);
      return errorMessage;
    }
  }
  return total;
}

const getTotalGoals = async (team, year) => {
  const url = 'https://jsonmock.hackerrank.com/api/';
  const homeTotal = await countGoalsforTeam(team, `${url}football_matches?year=${year}&team1=${team}`);
  const guestTotal = await countGoalsforTeam(team, `${url}football_matches?year=${year}&team2=${team}`);
  return homeTotal + guestTotal;
};

module.exports = getTotalGoals;
