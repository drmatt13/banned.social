import { useEffect, useRef, useContext } from 'react'
import Head from 'next/head'

import axios from 'axios'
import Cookie from 'js-cookie'

// context
import socialContext from '../../utils/socialContext'

const index = () => {

  const { user_id, setUser_id, router } = useContext(socialContext)

  const firstName = useRef(),
    lastName = useRef(),
    email = useRef(),
    password = useRef();

  const redirectHome = async () => {
    await router.push('/');
  }

  useEffect(() => {
    if (user_id) redirectHome()
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    const res = await axios.post(`/api/eventbus`, {
      'service': "register",
      'firstName': firstName.current.value,
      'lastName': lastName.current.value,
      'email': email.current.value,
      'password': password.current.value
    }, { 'withCredentials': true });

    if (res.data.success) {
      Cookie.set('bearer', res.data.bearer, { expires: 7 });
      setUser_id(res.data.user_id);
      location.reload();
    } else {
      // error stuff
      console.log('failure');
    }
  }

  return <>
    <Head>
      <title>Banned.Social | Sign Up</title>
    </Head>
    <form onSubmit={onSubmit} >
      <input ref={firstName} type="text" placeholder="first name" /><br />
      <input ref={lastName} type="text" placeholder="last name" /><br />
      <input ref={email} type="email" placeholder="email" /><br />
      <input ref={password} type="password" placeholder="password" /><br />
      <input type="submit" value="Register" />
    </form>
  </>
}

export default index