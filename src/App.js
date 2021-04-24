import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import {db, auth, storage} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser)
      {
        console.log(authUser);
        setUser(authUser);
      }
      else
      {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post:doc.data()
      })))
    })
  },[])

  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ):(
        <h3>Please login to Upload !</h3>
      )}
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src="data:image/png;base64,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" alt="" width="30%" height="auto"/>
              </center>
            <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" onClick={signUp}>SignUp</Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src="data:image/png;base64,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" alt="" width="30%" height="auto"/>
            </center>
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img className="app__headerImage" src="data:image/png;base64,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" alt="" width="16%" height="auto"/>
      </div>

      {
        user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ):(
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )
      }
      

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

    </div>
  );
}

export default App;
