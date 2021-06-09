import { useState, useEffect, useRef } from 'react';

const index = ({ users: {users} }) => {

  const firstName = useRef(),
        lastName = useRef(),
        email = useRef(),
        password = useRef();

  useEffect(() => {
    console.log(users);
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${process.env.URL}/api/mongo`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName.current.value, 
        lastName: lastName.current.value, 
        email: email.current.value, 
        password: password.current.value
      })
    });
    const data = await res.json();
    console.log(data);
  }

  return <>

    <form onSubmit={onSubmit} >
      <input ref={firstName} type="text" placeholder="first name"/><br/>
      <input ref={lastName} type="text" placeholder="last name"/><br/>
      <input ref={email} type="email" placeholder="email"/><br/>
      <input ref={password} type="password" placeholder="password"/><br/>
      <input type="submit" value="submit" />
    </form>

    <ul>
      {users && users.map((user, i) => (
        <li key={user._id}>{user.firstName}</li>
      ))}
    </ul>

  </>
}

export default index;

export async function getServerSideProps() {

  const data = await fetch(`${process.env.URL}/api/mongo`);
  const users = await data.json();

  return {
    props: {
      users
    }
  }
}
