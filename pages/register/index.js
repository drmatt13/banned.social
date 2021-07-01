import { useEffect, useRef, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import axios from 'axios'
import Cookie from 'js-cookie'

// context
import socialContext from '../../utils/socialContext'

// css
import styles from '../../styles/login.module.scss'
import glitch from '../../styles/glitch.module.scss'

const index = () => {

  const { user_id, setUser_id, router } = useContext(socialContext)

  const firstName = useRef(),
    lastName = useRef(),
    email = useRef(),
    password = useRef(),
    password2 = useRef();

  const redirectHome = async () => {
    await router.push('/');
  }

  useEffect(() => {
    if (user_id) redirectHome()
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    if (password.current.value != password2.current.value) {
      alert("passwords do not match")
    }

    else {
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
    
  }

  return <>
    <Head>
      <title>Banned.Social | Sign Up</title>
    </Head>
    <div className={styles.login_container}>
      <div className={styles.login_header}>
        <div className={`${glitch.glitch} no-select`} data-text="banned.social">banned.social</div>
      </div>
      <div className={`${styles.form_container} fade-in`}>
        <form onSubmit={onSubmit}>
          <input ref={email} type="email" id="email" name="email" placeholder="Email" required />
          <input ref={firstName} type="text" id="fname" name="fname" placeholder="First Name" required />
          <input ref={lastName} type="text" id="lname" name="lname" placeholder="Last Name" required />
          {/* <input type="text" id="username" name="username" placeholder="Username" required /> */}
          <input ref={password} type="password" id="password" name="password" placeholder="Password" required />
          <input ref={password2} type="password" id="password2" name="password2" placeholder="Comfirm Password" required />
          <input type="submit" value="REGISTER" />
        </form>
        <div className={styles.login_footer}>
          <div>
            <div>Already a user?</div>
            <div>
              <Link href="/login">Login now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default index
