import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage = () => {
  /* 
  useQuery 훅을 사용하니, data fetching을 하기 위한 코드가 대폭 줄었다.
  복잡한 Promise 정제도 사라졌고, useQuery 훅의 리턴값에는 loading state 혹은 error state 또한 포함되므로,
  값은 distructuring을 통해 따로 뽑아 사용할 수 있으니, 훨씬 편리하며 정확하다.
  */

  // useQuery 훅의 첫번째 인자로는 유니크한 key가 들어가며, 두번째 인자는 API 호출 로직이다.
  const { data, isLoading, isError } = useQuery(
    'super-heroes',
    fetchSuperHeroes
  );

  /* loading 중이라면 로딩 메시지를 대신 보여준다. */
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </div>
  );
};
