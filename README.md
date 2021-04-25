# **Instagram Clone using React.Js**

## **[useState](https://github.com/RgnDunes/Facebook-Messenger-Clone#)**
This helps create a state variable inside a functional component.

```
Syntax :
const [messages, setMessages] = useState([{}]);
```

In above syntax *messages* is the name of state created. "setMessages" is a function that helps changing state just like setState in class component. The argument inside useState is the initial value of the state which in this case is a list of objects.

## **[useEffect](https://medium.com/trabe/react-useeffect-hook-44d8aa7cccd0)**
This function executes on a given condition.

```
Syntax :
useEffect(() => { setUsername(prompt('Please enter your name : ')); }, [])
```

Above function executes once because it's second argument is an empty list here. As long as we only want our effect (subscribe to resizes) to be called once, we pass an empty array as the second parameter of the function useEffect . An effect can optionally return a function (the cleanup function) that React will call when the component unmounts and before running the effect next time.

## **[Firebase Commands Used](https://github.com/RgnDunes/Facebook-Messenger-Clone#)**
> ## **Saving Data from Frontend to Firestore.**
```
db.collection('messages').add({ message : input, username : username, timestamp : firebase.firestore.FieldValue.serverTimestamp() });
```

> ## **Reading Data from Firestore.**
```
db.collection('messages').orderBy( 'timestamp', 'desc').onSnapshot(snapshot => ( setMessages(snapshot.docs.map(doc => ({id : doc.id, message: doc.data()}))) ))
```

> ## **Uploading an Image to Firebase Storage**
```
const uploadTask = storage.ref(`images/${image.name}`).put(image);
```

> ## **Getting Download Url for the uploaded images**
```
uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage.ref("images").child(image.name).getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        imageUrl : url,
                        username : username
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }
        );
```
Where 
```
(snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
              }
```            
above code just calculates the progress of file being uploaded i.e., how much is the file uploaded and
```
(error) => {
                console.log(error);
                alert(error.message);
           }
```
above code simple sees if there is any error while uploading the file and
```
() => {
        storage.ref("images").child(image.name).getDownloadURL()
        .then(url => {
            db.collection("posts").add({
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                caption : caption,
                imageUrl : url,
                username : username
            });
            setProgress(0);
            setCaption("");
            setImage(null);
        });
    }
```
above piece of code is special as it gives us the url/link of the image files uploaded.

> ## **Selecting files from browse to upload**
```
if(event.target.files[0])
    {
        setImage(event.target.files[0]);
    }
```
above piece of code just uploads the first file out of multiple files (if selected).

> ## **Creating account using firebase auth**
```
auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

```

> ## ** Logging In using firebase auth**
```
auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
```

## **[Firebase Deploy Commands](https://github.com/RgnDunes/Facebook-Messenger-Clone#)**
- sudo npm install -g firebase-tools
- firebase login
- firebase init
- Hosting : Configure and deploy Firebase - Hosting sites
- Use an existing project
- Select your project
- What do you want to use as your public directory ? build
- Configure as a single page app ? Yes
- npm run build
- firebase deploy

#

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
