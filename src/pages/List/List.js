import { useState } from "react";
import { Button, Input, List, Modal } from "antd";
import style from "../MainContentList/MainContentList.module.css";
import API from "../API/API";

const ShowList = (props) => {
  const mainListRender = (item) => (
    <List.Item className={style.listItem}>{item}</List.Item>
  );

  const favoriteListRender = (item) => (
    <List.Item className={style.listItem}>
      <div className={style.favoritesContainer}>
        <h3 className={style.favPara}>{item.name}</h3>
        <div className={style.favImg}>{item.image}</div>
      </div>
    </List.Item>
  );
  const modal = (
    <Modal
      title={props.modalTitle}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      {props.modalDesc}
      <Button onClick={props.addToFavorites}>★</Button>
    </Modal>
  );
  return (
    <>
      <API pullData={props.pullData}></API>;
      <h2 className={style.dividerText}>{props.Title}</h2>
      {props.isMainList ? (
        <>
          <h3 className={style.searchTitle}>Search Characters</h3>
          <Input className={style.searchInput} onChange={props.search} />
        </>
      ) : null}
      <List
        className={style.list}
        dataSource={props.dataSrc}
        renderItem={props.isMainList ? mainListRender : favoriteListRender}
      />
      {props.showModal ? modal : null}
      <Button
        className={style.favoriteButton}
        onClick={props.setFavoriteOnClick}
      >
        {props.goBack ? "Go Back" : "Show Favorites"}
      </Button>
      <Button className={style.logOutButton} href="/">
        LogOut
      </Button>
    </>
  );
};

export default ShowList;
