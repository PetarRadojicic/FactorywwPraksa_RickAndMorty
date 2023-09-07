import { React, useState, useEffect } from "react";
import { Button, Input, List, Modal } from "antd";
import style from "./MainContentList.module.css";
import to from "await-to-js";
import axios from "axios";

export const MainContentLIst = () => {
  const [chars, setChars] = useState([]);
  const [showedChars, setShowedChars] = useState([]);

  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [isFavoritesShow, setIsFavoritesShow] = useState(false);

  // api calls usually go into modules then we only reference those functions calls inside components
  // component should isolate all possible logic that is not coupled with GUI
  useEffect(() => {
    const fetchData = async () => {
      const [error, response] = await to(
        axios.get("https://rickandmortyapi.com/api/character/")
      );
      if (error) {
        alert("failed to pull");
      } else {
        setChars(response.data.results);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setShowedChars(
      chars.map((element) => (
        <li value={element.id} key={element.id} onClick={showClickedChar}>
          {element.name}
        </li>
      ))
    );
  }, [chars]);

  const showClickedChar = (e) => {
    setIsModalOpen(true);
    let Id = e.target.value - 1;
    for (let value in chars) {
      if (value == Id)
        setModalTitle(
          <>
            <p>{chars[Id].name}</p>
          </>
        );
      setModalDesc(
        <>
          <img src={chars[Id].image} />
        </>
      );
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const search = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredChars = chars.filter((char) =>
      char.name.toLowerCase().startsWith(searchTerm)
    );

    if (filteredChars.length > 0) {
      setShowedChars(
        filteredChars.map((element) => (
          <li value={element.id} key={element.id} onClick={showClickedChar}>
            {element.name}
          </li>
        ))
      );
    } else {
      setShowedChars([]);
    }
  };

  const addToFavorites = () => {
    setIsModalOpen(false);
    const selectedCharacter = {
      name: modalTitle.props.children.props.children,
      image: modalDesc.props.children,
    };

    setFavorites((prevFavorites) => [...prevFavorites, selectedCharacter]);
  };

  return !isFavoritesShow ? (
    <>
      <h2 className={style.dividerText}>List Of Rick And Morty characters</h2>
      <h3 className={style.searchTitle}>Search Characters</h3>
      <Input className={style.searchInput} onChange={search} />
      <List
        className={style.list}
        dataSource={showedChars}
        renderItem={(item) => (
          <List.Item className={style.listItem}>{item}</List.Item>
        )}
      />
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalDesc}
        <Button onClick={addToFavorites}>★</Button>
      </Modal>
      <Button
        className={style.favoriteButton}
        onClick={() => {
          setIsFavoritesShow(true);
        }}
      >
        See Favorites
      </Button>
      <Button className={style.logOutButton} href="/">
        LogOut
      </Button>
    </>
  ) : (
    <>
      <h2 className={style.dividerText}>List Of Rick And Morty characters</h2>
      <h3 className={style.searchTitle}>Favorites</h3>
      <List
        className={style.list}
        dataSource={favorites}
        renderItem={(item) => (
          <List.Item className={style.listItem}>
            <div className={style.favoritesContainer}>
              <h3 className={style.favPara}>{item.name}</h3>
              <div className={style.favImg}>{item.image}</div>
            </div>
          </List.Item>
        )}
      />
      <Button
        className={style.favoriteButton}
        onClick={() => setIsFavoritesShow(false)}
      >
        Go Back
      </Button>
      <Button className={style.logOutButton} href="/">
        LogOut
      </Button>
    </>
  );
};

export default MainContentLIst;
