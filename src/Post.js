import React, { useState, useEffect } from 'react';
import './Post.css';
import {db} from './firebase';
import firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar';

function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId)
        {
            unsubscribe = db.collection('posts').doc(postId).collection("comments").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return () => {
            unsubscribe();
        };
    }, [postId])

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" alt="" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCAkIBxcJCBMXFxcZGSIZGRkYFxwaHBwaGyEaISMoHBwhLCwwIyYoJyIjJTUkKDoyMjIyJCM6PTo0PCwxNy8BCwsLDw4PHRERHTEpIykxMTMzMzMxMToxMTQ6MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIALABHgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwYBBQcEAv/EAEAQAAIBAwEECAQDBAgHAAAAAAABAgMEEQUGEiExExRBUVNhcZIigZGhByMyQnKCwRUWMzRSYsLSJCVjo7HR8P/EABkBAQADAQEAAAAAAAAAAAAAAAABAwQCBf/EAC4RAAICAQIEBAUEAwAAAAAAAAABAgMRITEEElFhEyJBcTKBkbHRBRShwSMzQv/aAAwDAQACEQMRAD8A5v1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhABN1q58SfuY61c+JP3MhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMm62c2duNdqtxluU4vEp4y890V2vH04Fj/qjs9KfV4XkukXBrpaTef3cF0KJyWUZbeMqqlyybz2WcFCMFm1rY3UNOi61v+bTXFuKxNLzhxz6rJWiuUJQeJIurthZHmg8owCSlRqV6qpUYuUm8KMVlt+SLdpmwtepT6bVqipLnuxw5L96T4L7kwrnN4ijm2+upZm8fcpwL7/U7RLtOnp123US/wAdOpj1ikmU3VdOuNKvZWd0viXFNcpRfJryZM6pQ1exzTxNdrxF69HozxgyYKzQAAAAAAAA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"></Avatar>
                <h3>{username}</h3>
            </div>
            
            <img className="post__image" src={imageUrl} alt=""/>
            <h4 className="post__text"><strong>{username}:</strong> {caption}</h4>

            <div className="post__comments">
                {comments.map((indivComment) => (
                    <p>
                        <strong>{indivComment.username}</strong> {indivComment.text}
                    </p>
                ))}
            </div>
            
            {user && (
                <form className="post__commentBox">
                    <input className="post__input" type="text" placeholder="Add a comment ..." value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <button disabled={!comment} className="post__button" type="submit" onClick={postComment}>Post</button>
                </form>
            )}
            
        </div>
    );
}

export default Post;
