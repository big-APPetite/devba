import Firebase from 'firebase';

//replicates model aspect of MVC architecture
export default async function SubmitRegister(values) {
  Firebase.auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(res => {
      Firebase.database()
        .ref('users/' + res.user.uid + res.user.notifications)
        .set({
          uid: res.user.uid,
          username: values.username,
          email: values.email,
          notifications: values.notifications,
        });
    })
    .catch(function(error) {
      //handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is not secure enough.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  //NEEDS FIX, LOGS EVEN IF UNSUCCESSFUL
  console.log('USER REGISTERED SUCCESSFULLY:', Date(Date.now()), values);
}
