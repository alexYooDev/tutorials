import axios from 'axios';
import { useEffect, useState } from 'react';

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  /* 
  재래적인 방식의 data fetching logic , 
  단순히 서버에서 데이터를 받아오는 것임에도 불구하고 많은 코드를 작성해야 한다.
  또한, 데이터를 받아오는 도중 상태를 나타내기 위한 
  isLoading state 또한 useState로 따로 선언해야 하니 번거롭다.
  */
  useEffect(() => {
    const fetchSuperHeroes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/superheroes');
        const data = await response.data;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuperHeroes();
  }, []);
  /* isLoading 중이라면, 서버 데이터를 사용하는 로직 대신, Loading... 메시지를 보여준다. */
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </div>
  );
};
