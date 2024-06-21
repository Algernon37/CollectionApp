import Entry from '../../componets/Entry/Entry';

function Register() {
  return (
    <Entry
      authFunction='createUser'
      nameButton='Register'
    />
  );
}

export default Register;

