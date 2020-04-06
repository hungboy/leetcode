const USER_SONGS = {
  David: ['song1', 'song2', 'song3', 'song4', 'song8'],
  Emma: ['song5', 'song6', 'song7'],
};

const SONG_GENRES = {
  Rock: ['song1', 'song3'],
  Dubstep: ['song7'],
  Techno: ['song2', 'song4'],
  Pop: ['song5', 'song6'],
  Jazz: ['song8', 'song9'],
};

const generateReverseMapping = (songGenres: { [genre: string]: string[] }) => {
  const songMap: Map<string, string[]> = new Map();

  for (let genre of Object.entries(songGenres)) {
    let [name, songs] = genre;
    for (let song of songs) {
      if (!songMap.has(song)) {
        songMap.set(song, []);
      }
      songMap.set(song, [...songMap.get(song), name]);
    }
  }
  return songMap;
};

const findKFavouriteGenres = (
  genres: { [name: string]: string[] },
  userSongs: { [name: string]: string[] },
  k: number
) => {
  const songMap = generateReverseMapping(genres);
  const userGenres: [string, string[]][] = [];

  for (let userData of Object.entries(userSongs)) {
    const [userName, songs] = userData;
    const userGenreCount: Map<string, number> = new Map();

    for (let song of songs) {
      if (songMap.has(song)) {
        const songGenres = songMap.get(song);
        for (let genreName of songGenres) {
          if (!userGenreCount.has(genreName)) {
            userGenreCount.set(genreName, 0);
          }
          userGenreCount.set(genreName, userGenreCount.get(genreName) + 1);
        }
      } else {
        if (!userGenreCount.has('unknown')) {
          userGenreCount.set('unknown', 0);
        }
        userGenreCount.set('unknown', userGenreCount.get('unknown') + 1);
      }
    }

    const sortedGenres = [...userGenreCount].sort(
      ([nameA, countA], [nameB, countB]) => {
        if (countA === countB) {
          return nameA < nameB ? -1 : 1;
        } else {
          return countA - countB;
        }
      }
    );

    userGenres.push([
      userName,
      sortedGenres.splice(0, k).map((genre) => genre[0]),
    ]);
  }

  return userGenres;
};

console.log(`Favs: ${findKFavouriteGenres(SONG_GENRES, USER_SONGS, 2)}`);
