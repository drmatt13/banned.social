import { useState, useEffect, useRef, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import axios from 'axios'
import Cookie from 'js-cookie'

// components
import Loading from '../../components/Loading'

// context
import socialContext from '../../utils/socialContext'

// css
import styles from '../../styles/login.module.scss'
import glitch from '../../styles/glitch.module.scss'

const index = () => {

  const { user_id, setUser_id, router } = useContext(socialContext)

  const email = useRef(),
    password = useRef();

  const [loading, setLoading] = useState(false)

  const redirectHome = async () => {
    await router.push('/');
  }

  useEffect(() => {
    if (user_id) redirectHome()
  }, []);

  const onSubmit = async e => {
    e.preventDefault()

    setLoading(true)

    const res = await axios.post(`/api/eventbus`, {
      'service': "login",
      'email': email.current.value,
      'password': password.current.value
    }, { 'withCredentials': true })


    if (res.data.success) {
      Cookie.set('bearer', res.data.bearer, { expires: 7 });
      setUser_id(res.data.user_id);
      router.push('/')
    } else {
      // error stuff
      console.log('failure');
      setLoading(false)
    }
  }

  return loading ? <><Loading /></> : <>
    <Head>
      <title>Banned.Social | Login</title>
    </Head>
    <div className={styles.login_container}>
      <div className={styles.login_header}>
        <div className={`${glitch.glitch} no-select`} data-text="banned.social">banned.social</div>
      </div>
      <div className={`${styles.form_container} fade-in`}>
        <form onSubmit={onSubmit}>
          <input ref={email} type="text" id="login" name="login" placeholder="Username" required />
          <input ref={password} type="password" id="password" name="password" placeholder="Password" required />
          <input type="submit" value="SIGN IN" />
        </form>
        <div className={styles.login_footer}>
          <div>
            <div>Not a member?</div>
            <div>
              <Link href="/register">Sign up now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default index
