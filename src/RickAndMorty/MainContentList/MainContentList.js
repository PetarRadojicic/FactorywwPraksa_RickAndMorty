import { React, useState, useEffect }   from 'react';
 import { Button, Input, List, Modal }  from 'antd'; 
 import style                           from './MainContentList.module.css' ;
 import axios                           from 'axios';
  import Favorites                      from './Favorites/favorites';
   function MainContentLIst() {

    const [chars, setChars] = useState([]);
    const [showedChars, setShowedChars] = useState([]);

    const [modalTitle, setModalTitle] = useState('');
    const [modalDesc, setModalDesc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [favorites, setFavorites] = useState([]);
    const [isFavoritesShow, setIsFavoritesShow] = useState(false);


    useEffect(() => {
        axios
            .get("https://rickandmortyapi.com/api/character/")
            .then(fin => {
                setChars(fin.data.results);
            })
            .catch(err => {
                alert('failed to pull');
            });
    }, []);

    // useEffect(() => {

    //     <Favorites sendArrayOfChars={favorites}/>
    // }, [favorites]);

    useEffect(() => {
        setShowedChars(chars.map((element) => <li value={element.id} key={element.id} onClick={showClickedChar}>{element.name}

        </li>))
    }, [chars]);

    const showClickedChar = (e) => {

        setIsModalOpen(true);
        let Id = e.target.value - 1;
        for (let value in chars) {

            if (value == Id)
                setModalTitle(<><p>{chars[Id].name}</p></>)
            setModalDesc(<><img src={chars[Id].image} /></>)
        }

    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const Search = (e) => {
        const searchTerm = e.target.value.toLowerCase();

        const filteredChars = chars.filter((char) => char.name.toLowerCase().startsWith(searchTerm));

        if (filteredChars.length > 0) {
            setShowedChars(filteredChars.map((element) => (
                <li value={element.id} key={element.id} onClick={showClickedChar}>
                    {element.name}
                </li>
            )));
        } else {
            setShowedChars([]);
        }
    }

    const addToFavorites = () => {
 
        setIsModalOpen(false);
        const selectedCharacter = {
            name: modalTitle.props.children.props.children,
            image: modalDesc.props.children
        };


        setFavorites(prevFavorites => [...prevFavorites, selectedCharacter]);

    };

    const Edit = (e) =>{
        console.log(e.target.parentNode.img)
    }



    return (
        !isFavoritesShow ? <>
            <h2 className={style.dividerText}>List Of Rick And Morty characters</h2>
            <h3 className={style.searchTitle}>Search Characters</h3>
            <Input className={style.searchInput} onChange={Search} />
            <List
                className={style.list}
                dataSource={showedChars}
                renderItem={(item) => <List.Item className={style.listItem}>{item}</List.Item>}
            />
            <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {modalDesc}
                <Button onClick={addToFavorites}>★</Button>
            </Modal>
            <Button className={style.favoriteButton} onClick={() => {setIsFavoritesShow(true)} }>See Favorites</Button>
            <Button className={style.logOutButton} href='/'>LogOut</Button>
        </> : <>
      <h2 className={style.dividerText}>List Of Rick And Morty characters</h2>
      <h3 className={style.searchTitle}>Favorites</h3> 
      <List
        className={style.list}
        dataSource={favorites}
        renderItem={(item) => (
          <List.Item className={style.listItem}><div className={style.favoritesContainer}><h3 className={style.favPara}>{item.name}</h3><div className={style.favImg}>{item.image}</div><Button onClick={Edit}>Edit</Button></div></List.Item>
        )}
      />
      <Button className={style.favoriteButton} onClick={() => setIsFavoritesShow(false)}>Go Back</Button>
      <Button className={style.logOutButton} href='/'>LogOut</Button>
    </>

    );
}

export default MainContentLIst;