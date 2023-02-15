import axios from 'axios';
import { useEffect, useState } from 'react';
import NaverUrl from '../commonApi_naver/naverUrl';
import NaverHeaders from '../commonApi_naver/naverHeaders';
import NaverInfo from './Naver_info';

const Naver_result = () => {
  const [searchMovieList, setSearchMovieList] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getSearchList();
  }, []);

  const getSearchList = async (e) => {
    //e.preventDefault();
    await axios
      .get(NaverUrl + 'query=' + input, NaverHeaders)
      .then((response) => {
        console.log(response.data.items);
        setSearchMovieList(response.data.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleInputText = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const searchMv = async (e) => {
    e.preventDefault();
    getSearchList();
  };

  return (
    <div>
      <form onSubmit={searchMv}>
        <div>
          <input
            type='text'
            required={true}
            placeholder='제목, 장르를 검색해주세요. (ex: 코미디 영화, 액션 영화)'
            onChange={handleInputText}
            value={input}
          />
          <button type='submit'>검색</button>
        </div>
      </form>
      <div className='movieList' style={{ marginTop: 20, marginLeft: 50 }}>
        {searchMovieList.map((movie, index) => {
          return <NaverInfo movie={movie} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Naver_result;
