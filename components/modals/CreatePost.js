import { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'

// components
import PostHeader from '../PostHeader'
import ExitButton from '../ExitButton'
import Loading from '../Loading'

// context
import socialContext from '../../utils/socialContext'

const CreatePost = ({ profile_id, post, setPost, posts, setPosts, metadata, setMetadata, setModal }) => {

  const { users, user_id } = useContext(socialContext)

  const postRef = useRef()

  const [placeholder, setPlaceholder] = useState(`What's on your mind, ${users[user_id].firstName}?`)
  const [ogLink, setOgLink] = useState()
  const [loading, setLoading] = useState(10)
  const [url, setUrl] = useState()

  function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  useEffect(() => {
    if (metadata)
      if (!metadata.ogSiteName || !metadata.ogTitle)
        clearMetadata()
  }, [metadata])

  useEffect(() => {
    if (user_id !== profile_id) setPlaceholder(`Write something to ${users[profile_id].firstName} ${users[profile_id].lastName}...`);

    postRef.current.innerHTML = post
    placeCaretAtEnd(postRef.current)

    postRef.current.addEventListener('input', e => {
      setPost(postRef.current.innerHTML)
      const word = getWord()
      if (checkLink(word.substring)) setOgLink(word.substring);
    });
  }, [])

  const getWord = () => {
    const node = document.getSelection();
    const textContent = node.focusNode.textContent;
    let left = node.anchorOffset,
      right = left;
    while (!!!textContent.charAt(left - 1).match(/^$|\s+/)) left--;
    while (!!!textContent.charAt(right).match(/^$|\s+/)) right++;
    return { substring: textContent.substring(left, right), left, right };
  }

  const checkLink = word => {
    if (word.length >= 7) {
      const substring = word.substring(0, 7);
      if ('http://' === substring || 'https://' === substring + '/') return true;
    }
    return false;
  }

  const getMetadata = async () => {
    if (!ogLink || loading) return;
    const res = await axios.post(`${process.env.URL}/api/eventbus`, {
      service: "get og",
      url: ogLink
    }, { withCredentials: true });

    if (res.data.success) {
      setUrl(ogLink);
      setMetadata(res.data.ogMetadata);
      setLoading(10);
    }
    else {
      setLoading(10);
      setMetadata(undefined);
    }
    setOgLink(undefined);
  }

  const clearMetadata = () => {
    setMetadata(null)
    placeCaretAtEnd(postRef.current)
  }

  useEffect(() => {
    if (ogLink) {
      setLoading(9);
    }
  }, [ogLink]);

  useEffect(() => {
    console.log(loading);
    let interval;
    if (10 > loading && loading > 0) interval = setInterval(() => {
      setLoading(loading => loading - 1);
    }, 150);
    else {
      clearInterval(interval);
      getMetadata(ogLink);
    }
    return () => {
      clearInterval(interval);
    }
  }, [loading])

  const submitPost = async e => {

    setLoading(true);

    e.preventDefault()
    const res = await axios.post(`${process.env.URL}/api/eventbus`, {
      service: "create post",
      profile_id,
      post,
      url
    }, { withCredentials: true })

    console.log(res.data);

    if (res.data.success) {
      if (posts) {
        setPosts([res.data.post, ...posts])
        setPost('')
        setMetadata(null)
      }
      else setPosts([res.data.post])
      setModal(null)
    }
    setLoading(false);
    // error

  }

  return <>
    <style jsx>{`
      .create-post-container {
        min-height: 325px;
        max-height: 450px;
        padding-top: 10px;
      }
      .header {
        margin: 0 15px 10px 15px;
        padding-bottom: 15px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        border-bottom: 1px solid #0004;
      }
      .post-container {
        margin: 10px 10px 0 10px;
        padding: 0 5px;
        min-height: 150px;
        max-height: 265px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .post-placeholder {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 5px;
      }
      .post-placeholder:hover {
        cursor: text;
      }
      .post {
        outline: 0px solid transparent;
        // min-height: 50px;
        flex: 1;
      }
      .post-submit {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        height: 40px;
        width: calc(100% - 20px);
        color: #FFF;
        border-radius: 20px;
        font-size: large;
        transition: background-color 0.075s ease-in;
      }
      .disabled {
        background-color: #5558;
      }
      .disabled:hover {
        // cursor: not-allowed;
      }
      .enabled {
        background-color: rgb(25, 144, 255);
      }
      .enabled:hover {
        background-color: rgb(64, 161, 251);
        cursor: pointer;
      }

      .post-og-loading-container {
        margin-top: 15px;
        height: 150px;
        width: 100%;
        position: relative;
      }
      .post-og-container {
        position: relative;
        margin-top: 15px;
        width: 100%;
      }
      .post-og-image {
        width: 100%;
      }
      .post-og-image img {
        display: block;
        width: 100%;
        max-height: 300px;
        object-fit: cover;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
      .post-og-info {
        background-color: #0008;
        padding: 5px 10px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }
      .post-og-info > div {
        padding-bottom: 2.5px;
      }
      .post-og-sitename {
        font-size: small;
        color: #FFF7;
      }
      .post-og-title {
        color: #FFFB;
      }
    `}</style>

    <div className="create-post-container">
      <div className="header">Create Post</div>
      <PostHeader sender_id={user_id} reciever_id={profile_id} />
      <div className="post-container">
        {!post && <div className="post-placeholder no-select">{placeholder}</div>}
        <div className="post" ref={postRef} contentEditable="plaintext-only"></div>


        {10 > loading && <>
          <div className="post-og-loading-container">
            <Loading />
          </div>
        </>}
        {(metadata && loading === 10) && <>

          <div className="post-og-container no-select">
            <ExitButton visable={true} exit={clearMetadata} size={25} padding={10} solid={true} />
            {metadata.ogImage && <div className="post-og-image">
              <img src={metadata.ogImage.url} alt="og-image" />
            </div>}
            <div className="post-og-info">
              <div className="post-og-sitename">{metadata.ogSiteName}</div>
              <div className="post-og-title">{metadata.ogTitle}</div>
            </div>
          </div>

        </>}
      </div>
      {(!metadata && (!!!post || 10 > loading)) ? <>
        <div className="post-submit disabled no-select">Post</div>
      </> : <>
        <div className="post-submit enabled no-select" onClick={submitPost}>Post</div>
      </>}
    </div>

  </>
}

export default CreatePost
