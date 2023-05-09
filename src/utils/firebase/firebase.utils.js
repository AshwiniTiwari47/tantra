import { initializeApp }  from 'firebase/app';
import { getAuth, signInWithPopup , signInWithRedirect , 
    GoogleAuthProvider,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch ,query, getDocs} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDDFjLPsIafCUCCX5f7SKnfh5XTwdXKdUc",
    authDomain: "tantra-f7c89.firebaseapp.com",
    projectId: "tantra-f7c89",
    storageBucket: "tantra-f7c89.appspot.com",
    messagingSenderId: "413993536806",
    appId: "1:413993536806:web:3c2d9e35a3082391b085e7"
  };


 initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });


  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

  export const db = getFirestore();

//==================Categories Collections================================
  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) =>{
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    });

    await batch.commit();
    console.log('Done');
  }

  export const getCategoriesAndDocuments = async ()=>{
    const collectionRef = collection(db,'categories');

    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
        const {title , items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})

    return categoryMap;
  }
//===============================================================================
  export const createUserDocFromAuth = async (userAuth,additionalInfo = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapShotData = await getDoc(userDocRef);
    console.log(userSnapShotData);
    console.log(userSnapShotData.exists());

    if(!userSnapShotData.exists()){
        const { displayName , email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{ displayName, email, createdAt,...additionalInfo});
        } catch (error) {
            console.log('error creating the user'+error.message);
        }
    }

    return userDocRef;

  } ;

export const createAuthUserWithEmailAndPassword = async (email,password)=>{

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);

}

export const signInAuthUserWithEmailAndPassword = async (email,password)=>{

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);

}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth,callback);


  