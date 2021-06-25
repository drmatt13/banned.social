import { useEffect, useRef, useContext } from 'react'
import Head from 'next/head'

import axios from 'axios'
import Cookie from 'js-cookie'

// context
import socialContext from '../../utils/socialContext'

const index = () => {

  const { user_id, setUser_id, router } = useContext(socialContext)

  const email = useRef(),
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
      'service': "login",
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
      <title>Login</title>
    </Head>
    <form onSubmit={onSubmit} >
      <input ref={email} type="email" placeholder="email" /><br />
      <input ref={password} type="password" placeholder="password" /><br />
      <input type="submit" value="Sign In" />
    </form>
  </>
}

export default index
