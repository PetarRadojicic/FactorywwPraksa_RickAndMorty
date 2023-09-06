import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import style from './favorites.module.css';

function Favorites(props) {
  const [favorites, setFavorites] = useState([]);

  console.log(favorites)
  useEffect(() => {
    setFavorites(props.sendArrayOfChars);
  }, [props.sendArrayOfChars]);

  return (
    <>
      <h2 className={style.dividerText}>List Of Rick And Morty characters</h2>
      <h3 className={style.searchTitle}>Favorites</h3>
      <List
        className={style.list}
        dataSource={favorites}
        renderItem={(item) => (
          <List.Item className={style.listItem}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </List.Item>
        )}
      />
      <Button className={style.logOutButton} href='/MainContentList'>
        Go Back
      </Button>
    </>
  );
}

export default Favorites;
