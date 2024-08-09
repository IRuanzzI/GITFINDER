import { useState } from "react";

import { Header } from "../../components/Header";
import backgroundgitimage from "../../assets/backgroundgitimage.png"
import React from 'react';
import ItemList from '../../components/itemList'
import './style.css';

function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={backgroundgitimage} className="background" alt="bg" />
        <div className="info">
          <div>
            <input name="usuario"

              placeholder="@username"
              value={user}
              onChange={event => setUser(event.target.value)}

            />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {currentUser?.name ? ( <>
            <div className="perfil">
            <img src={currentUser.avatar_url} className="profile" alt="profile"></img>
            <div>
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          <hr />
          </>
          ): null}
          
          {repos?.length ? (
            <div>
            <h4>Repositorios</h4>
              {repos.map(repo => (
                <ItemList title={repo.name} description={repo.description} />    
              ))}
          </div>
          ):null}

        </div>
      </div>
    </div>
  );
}

export default App;
