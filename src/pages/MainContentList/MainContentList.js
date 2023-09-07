import { React, useState, useEffect } from "react";
import { Button, Input, List, Modal } from "antd";
import style from "./MainContentList.module.css";
import API from "../API/API";
import ShowList from "../List/List";
export const MainContentLIst = () => {
  const [chars, setChars] = useState([]);
  const [showedChars, setShowedChars] = useState([]);

  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [isFavoritesShow, setIsFavoritesShow] = useState(false);

  const pullData = (data) => {
    setChars(data);
  };

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

  const setFavoriteOnClick = () => {
    setIsFavoritesShow(true);
  };

  return !isFavoritesShow ? (
    <ShowList
      pullData={pullData}
      search={search}
      showedChars={showedChars}
      modalTitle={modalTitle}
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      modalDesc={modalDesc}
      addToFavorites={addToFavorites}
      setFavoriteOnClick={setFavoriteOnClick}
      isMainList={true}
      showModal={true}
      dataSrc={showedChars}
      goBack={false}
      Title={"List Of Rick And Morty characters"}
    ></ShowList>
  ) : (
    <ShowList
      pullData={pullData}
      search={search}
      showedChars={showedChars}
      modalTitle={modalTitle}
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      modalDesc={modalDesc}
      addToFavorites={addToFavorites}
      setFavoriteOnClick={setFavoriteOnClick}
      isMainList={false}
      showModal={false}
      dataSrc={favorites}
      goBack={true}
      Title={"Favorites"}
    ></ShowList>
  );
};

export default MainContentLIst;
