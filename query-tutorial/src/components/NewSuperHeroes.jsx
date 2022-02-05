import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

const NewSuperHeroes = () => {
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(fetch);

  console.log(`fetching: ${isFetching} `);
  // if (isLoading) {
  //   return <h2>Being Loaded...</h2>;
  // }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>New SuperHeroes Page</h2>
      <button onClick={refetch}>Fetch SuperHeroes</button>
      <>
        {data?.map((heroes) => (
          <div key={heroes}>{heroes}</div>
        ))}
      </>
    </div>
  );
};

export default NewSuperHeroes;
