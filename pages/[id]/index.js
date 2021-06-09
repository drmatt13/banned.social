import { useEffect } from 'react'

const index = ({ id }) => {

  return <>
    <style jsx>{`
      .test {
        background-color: #${id};
      }
    `}</style>
    <div className="test">
      test
    </div>
  </>
}

export default index;

export async function getServerSideProps({ query: { id } }) {
  return {
    props: { id }
  }
}
