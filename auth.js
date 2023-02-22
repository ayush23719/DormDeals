import { firebase } from '@firebase/app';
import '@firebase/auth';

export const signUp = (email, password, name) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User created
            const user = userCredential.user;
            // Save user's display name to Firebase
            user.updateProfile({ displayName: name })
                .then(() => {
                    // Display name saved to Firebase
                    console.log('User created with display name: ', name);
                })
                .catch((error) => {
                    // Error saving display name
                    console.error('Error saving display name to Firebase: ', error);
                });
            return user;
        })
        .catch((error) => {
            // Error creating user
            console.error('Error creating user with email and password: ', error);
            throw error;
        });
};
