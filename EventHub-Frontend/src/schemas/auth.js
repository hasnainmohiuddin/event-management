import * as Yup from 'yup';

export const signInSchemaObj = {
  email: Yup.string().required('Required'),
  password: Yup.string()
  .required('Please Enter your password')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
};

export const signInSchema = Yup.object().shape(signInSchemaObj)

export const signUpSchema = Yup.object().shape({
  ...signInSchemaObj,
  name: Yup.string().max(50).required('Required'),
  confirmPassword: Yup.string()
    .test('passwords-match', 'Passwords must match', function(value){
      return this.parent.password === value
    })
});
