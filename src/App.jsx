import { useState, useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://www.reddit.com/r/aww.json')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data.children)
      })
  }, [])

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5', margin: 0, padding: 0, minHeight: '100vh' }}>
      
      <div style={{ backgroundColor: '#ff4500', color: 'white', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Reddit Clone</h1>
        <p>Basic version</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
        {posts.length === 0 ? <p style={{ textAlign: 'center' }}>Loading API data...</p> : null}
        
        {posts.map((item) => {
          const post = item.data
          return (
            <div key={post.id} style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
              <h3 style={{ marginTop: 0, color: '#333' }}>{post.title}</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>Author: {post.author} | Upvotes: {post.ups}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default App
