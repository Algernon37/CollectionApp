import Entry from '../../componets/Entry/Entry';

function LogIn() {
  return (
    <Entry 
        authFunction='signIn'
        nameButton='Log In'
    />
  );
}

export default LogIn;