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

  /* useQuery가  super-heroes key로 최초로 실행되면 isLoading state가 true로 설정되며,
  요청이 데이터를 받아오기 위해 보내진다. 요청이 완료되면, 
  key로 설정한 "super-heroes"와 fetchSuperHeroes 함수를 unique identifier로 활용하여 cache 된다.

  이후에 다시 같은 query call을 하면, react query는 cache 상에 해당 uniquer identifier가 존재하는 지 확인하고
  존재한다면, isLoading state를 true로 설정하지 않고 해당 cache 된 데이터를 보여준다.
  
  여기서, background refetching이 실행될 때 사용되는 flag state는 isFetching이다.
  isFetching이 true 인 상태에서 DB 데이터에 수정이 일어났는지 확인하고, 
  일어났다면 false로 변화 시 새로 업데이트된 정보를 UI 에 반영한다.

  */
  const { data, isLoading, isError, error, isFetching } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      cacheTime: 5000,
    }
  );

  console.log({ isLoading, isFetching });
  /* loading 중이라면 로딩 메시지를 대신 보여준다. */
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  /* 에러가 발생하면 에러메시지를 보여주지만,
   React Query 라이브러리가 자동으로 다시 fetching을 시도하기 때문에 로딩 상태가 더 길게 지속된다.
  */
  if (isError) {
    return <h2>{error.message}</h2>;
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
