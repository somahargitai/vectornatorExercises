const axios = require('axios');

const getTotalGoals = async (team, year) => {
  const url = 'https://jsonmock.hackerrank.com/api/';
  let total = 0;
  for (let page = 1, lastPage = false; !lastPage; page++) {
    try {
      const pageData = await axios.get(
        `${url}football_matches?year=${year}&team1=${team}&page=${page}`,
      );

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
      const errorMessage = `Error happened on getting hackerrank data for team ${team}, year ${year}, page ${page}`;
      console.log(errorMessage);
      console.log(error);
      return errorMessage;
    }
  }
  return total;
};

module.exports = getTotalGoals;