import ProTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Movie({ coverImg, title, summary, genres }) {
  return (
    <div>
      <img src={coverImg} alt={title} />
      <h2>
        <Link to='./Movie'>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g, index) => (
          <li key={g}>{g}</li>
        ))}
        coverImg, title, summary, genres
      </ul>
    </div>
  );
}
Movie.proTypes = {
  coverImg: ProTypes.string.isRequired,
  title: ProTypes.string.isRequired,
  summary: ProTypes.string.isRequired,
  genres: ProTypes.arrayOf(ProTypes.string).isRequired,
};
export default Movie;