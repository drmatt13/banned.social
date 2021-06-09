import { useEffect } from 'react'

const index = ({ id, test }) => {

  useEffect(() => {
    console.log(test);
  }, [])

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

  const data = await fetch(`${process.env.URL}/api/hello`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({lol: true})
  })

  const test = await data.json();

  return {
    props: {
      id,
      test
    }
  }
}
