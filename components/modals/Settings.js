import Cookie from 'js-cookie'

const Settings = () => {


  const logout = async () => {
    Cookie.remove('bearer')
    window.location = `${process.env.URL}/`
  }

  return (
    <button onClick={logout}>Logout</button>
  )
}

export default Settings
