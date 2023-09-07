// Wrong formatting, install eslint & prettier extensions then you can format code with your vsCode shortcuts

import { React, useState, useEffect }   from 'react';
 import { Button, Input, List, Modal }  from 'antd'; 
 import style                           from './MainContentList.module.css' ;
 import axios                           from 'axios';

export const MainContentLIst =() => {

    // good logical grouping of state variables, nice
    // One of the tasks tho was to implement useContext
    const [chars, setChars] = useState([]);
    const [showedChars, setShowedChars] = useState([]);

    const [modalTitle, setModalTitle] = useState('');
    const [modalDesc, setModalDesc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [favorites, setFavorites] = useState([]);
    const [isFavoritesShow, setIsFavoritesShow] = useState(false);


    // api calls usually go into modules then we only reference those functions calls inside components
    // component should isolate all possible logic that is not coupled with GUI
    useEffect(() => {
        // look into npm package "await-to-js" we largely use that instead of promise syntax
        axios
            .get("https://rickandmortyapi.com/api/character/")
            .then(fin => {
                setChars(fin.data.results);
            })
            .catch(err => {
                alert('failed to pull');
            });
    }, []);

    // Commented code, should delete
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

    // should be lower capital case, only functions that return JSX should be CapitalCase
    // in other words, components
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

    // formatting is set to indent 4 spaces , js/ts convention is 2 spaces

    return (
        !isFavoritesShow ? <>
            <h2 className={style.dividerText}>List Of Rick And Morty characters</h2>
            <h3 className={style.searchTitle}>Search Characters</h3>
            <Input className={style.searchInput} onChange={Search} />
            {/* This "LIST" should go into components folder, then reused on favorites page */}
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