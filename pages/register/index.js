import { useEffect, useRef, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'

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
    <style>{`
      .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 75px;
      }

      .wrapper {
        position: relative;
        margin-bottom: 50px;
      }

      .wrapper::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: .07em;
        height: .25em;
        width: 100%;
        background: linear-gradient(110deg, #e1f549, #29d0be, #6cb8ea, #ff5959);
        z-index: -1;
        transition: height .25s cubic-bezier(.6,0,.4,1);
      }

      .header {
        font-family: 'IBM Plex Mono', monospace;
        color: #FFF;
        font-size: 10vw;
      }

      @media only screen and (min-width: 800px) {
        .header {
          font-size: 80px;
        }
      }
      
      form div {
          margin: 10px;
      }
      
      form div input {
          height: 45px;
          width: 250px;
          padding-left: 10px;
          border-radius: 2px;
          outline: none;
          border: none;
          background-color: rgb(64, 64, 82);
          color: rgba(255, 255, 255, 0.8);
      }
      
      form div input:hover {
          background-color: rgb(72, 72, 90);
      }
      
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus,
      textarea:-webkit-autofill,
      textarea:-webkit-autofill:hover,
      textarea:-webkit-autofill:focus,
      select:-webkit-autofill,
      select:-webkit-autofill:hover,
      select:-webkit-autofill:focus {
          border: none;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.8);
          -webkit-box-shadow: 0 0 0px 1000px rgb(72, 72, 90) inset;
          transition: background-color 5000s ease-in-out 0s;
      }
      
      .login-container div:last-of-type input {
          width: 100%;
          padding: 0;
          color: #fff;
          background-color: rgb(212, 84, 127);
      }
      
      .login-container div:last-of-type input:hover {
          cursor: pointer;
          background-color: rgb(245, 97, 146);
      }
      
      .register-container {
          margin-top: 0!important;
          width: calc(100% - 20px);
          display: flex;
          align-items: center;
          justify-content: center;
      }
      
      .register-container-child {
          margin: 0!important;
          display: flex;
          flex-direction: row;
      }
      
      .register-container-child div {
          margin: 0!important;
          padding: 0 2.5px;
          color: gray;
      }
      
      a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: underline;
      }
      
      a:hover {
          color: rgba(245, 97, 146, 0.8);
      }
    `}</style>
    <div className="login-container">
      <div className="wrapper">
        <div className="header no-select">banned.social</div>
      </div>
      <form method="post">
        <div>
          <input type="text" id="fname" name="fname" placeholder="First Name" required />
        </div>
        <div>
          <input type="text" id="lname" name="lname" placeholder="Last Name" required />
        </div>
        <div>
          <input type="text" id="username" name="username" placeholder="Username" required />
        </div>
        <div>
          <input type="email" id="email" name="email" placeholder="Email" required />
        </div>
        <div>
          <input type="password" id="password" name="password" placeholder="Password" required />
        </div>
        <div>
          <input type="password" id="password2" name="password2" placeholder="Password" />
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
      <div className="register-container">
        <div className="register-container-child">
          <div>Already a user?</div><div><Link href="/login">Login now</Link></div>
        </div>
      </div>
    </div>
  </>
}

export default index
